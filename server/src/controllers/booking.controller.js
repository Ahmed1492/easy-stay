import Booking from "../../db/models/booking.model.js";
import Hotel from "../../db/models/hotel.model.js";
import Room from "../../db/models/room.model.js";
import transporter from "../config/nodemailer.js";
import stripe from 'stripe';
// How long an unpaid Stripe checkout keeps the dates reserved.
// Stripe sessions are created to expire a few minutes before this.
const STRIPE_HOLD_MINUTES = 35;
const STRIPE_SESSION_MINUTES = 31; // Stripe requires at least 30

const holdUntil = () => new Date(Date.now() + STRIPE_HOLD_MINUTES * 60 * 1000);

// Bookings whose stay overlaps [checkIn, checkOut). A guest can check in on
// the day the previous guest checks out.
const overlapping = (room, checkInDate, checkOutDate) => ({
  room,
  checkInDate: { $lt: new Date(checkOutDate) },
  checkOutDate: { $gt: new Date(checkInDate) },
});

// function to check room Availability
// `userId` ignores that user's own unfinished Stripe attempts (they get replaced on retry).
const checkAvailability = async ({ checkInDate, checkOutDate, room, excludeBookingId, userId }) => {
  const now = new Date();
  const legacyCutoff = new Date(now.getTime() - STRIPE_HOLD_MINUTES * 60 * 1000);

  const query = {
    ...overlapping(room, checkInDate, checkOutDate),
    status: { $ne: "cancelled" },
    // abandoned Stripe checkouts stop blocking once their hold has expired
    $nor: [
      {
        paymentMethod: "Stripe",
        status: "pending",
        $or: [
          { holdExpiresAt: { $lt: now } },
          // bookings created before holdExpiresAt existed
          { holdExpiresAt: { $exists: false }, createdAt: { $lt: legacyCutoff } },
        ],
      },
      ...(userId ? [{ user: userId, paymentMethod: "Stripe", status: "pending" }] : []),
    ],
  };
  if (excludeBookingId) query._id = { $ne: excludeBookingId };

  const blocking = await Booking.countDocuments(query);
  return blocking === 0;
};

//  check room Availability
export const checkAvailabilityApi = async (req, res) => {
  try {

    const { checkInDate, checkOutDate, room } = req.body;
    const checkIn = new Date(checkInDate).toISOString().split('T')[0];
    const checkOut = new Date(checkOutDate).toISOString().split('T')[0];
    const isAvailable = await checkAvailability({ checkInDate, checkOutDate, room, userId: req.user?._id });
    return res.json({ success: true, isAvailable, checkIn, checkOut });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, err: error.message, stack: error.stack });

  }
};

// create new booking
export const createBooking = async (req, res) => {
  try {

    const { room, checkInDate, checkOutDate, guests, isPaid, paymentMethod } = req.body;
    const user = req.user._id;

    if (!room || !checkInDate || !checkOutDate) {
      return res.json({ success: false, message: "Please choose check-in and check-out dates" });
    }
    if (new Date(checkOutDate) <= new Date(checkInDate)) {
      return res.json({ success: false, message: "Check-out must be after check-in" });
    }

    // Retrying after leaving Stripe without paying: replace the earlier attempt
    // instead of letting it block this user's new booking
    await Booking.updateMany(
      {
        ...overlapping(room, checkInDate, checkOutDate),
        user,
        paymentMethod: "Stripe",
        status: "pending",
      },
      { status: "cancelled" }
    );

    // must await — checkAvailability is async
    const isAvilable = await checkAvailability({ room, checkInDate, checkOutDate });
    if (!isAvilable) {
      return res.json({
        success: false,
        message: "Sorry, this room is already booked for some of these dates. Please choose different dates.",
      });
    }

    // get total price
    const roomData = await Room.findById(room).populate("hotel");
    let totalPrice = roomData.pricePerNight;

    // calculate total price per night
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const timeDiff = checkOut.getTime() - checkIn.getTime();
    const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
    totalPrice *= nights;

    // Both start as pending:
    // - Pay At Hotel → pending (hotel confirms on arrival)
    // - Stripe → pending until payment verified
    const status = "pending";
    const method = paymentMethod || (isPaid ? "Stripe" : "Pay At Hotel");

    // A booking is only paid once Stripe confirms it (webhook / verifyStripePayment)
    const booking = await Booking.create({
      user,
      room,
      hotel: roomData.hotel._id,
      checkInDate,
      checkOutDate,
      guests: +guests,
      totalPrice,
      isPaid: false,
      status,
      paymentMethod: method,
      ...(method === "Stripe" && { holdExpiresAt: holdUntil() }),
    });

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: req.user.email,
      subject: "Hotel Booking Details",
      html: `
      <h2> Your Booking Details </h2>
      <p> Dear ${req.user.username}, </p>
      <p> Thank you for your booking! Here are your booking details :</p>
      <ul> 
      <li> <strong> Booking ID :</strong>  ${booking._id}</li>
      <li> <strong> Hotel Name :</strong>  ${roomData.hotel.name}</li>
      <li> <strong> Location :</strong>  ${roomData.hotel.address}</li>
      <li> <strong> Date :</strong>  ${booking.checkInDate.toDateString()}</li>
      <li> <strong> Total :</strong>  $ ${booking.totalPrice} for ${nights} night${nights > 1 ? 's' : ''}</li>
      </ul>
      <p> We look forward to welcoming you!</p>
      <p> If you need to make any changes feel free to contact us.</p>


      `,
    };

    // The booking is already saved — a mail problem must not make it look failed
    try {
      await transporter.sendMail(mailOptions);
    } catch (mailError) {
      console.error("Booking email not sent:", mailError.message);
    }

    return res.json({ success: true, message: "Room Booked Successfully.", booking });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, err: error.message, stack: error.stack });

  }

};


// get all user bookings
export const userBookings = async (req, res) => {
  try {
    const userId = req.user._id;
    const bookings = await Booking.find({ user: userId }).populate("room hotel").sort({
      createdAt: -1
    });
    return res.json({ success: true, bookings });

  } catch (error) {
    console.log(error);
    return res.json({ success: false, err: error.message, stack: error.stack });
  }
};

// get booking detail for specefic owner

export const getHotelBookins = async (req, res) => {
  try {
    const hotel = await Hotel.findOne({ owner: req.auth.userId });

    if (!hotel) {
      return res.json({ success: false, message: "No Hotel Found" });
    }

    const bookings = await Booking.find({ hotel: hotel._id })
      .populate("room hotel user")
      .sort({ createdAt: -1 });

    const totalBookings = bookings.length;
    const totalRevenue = bookings.reduce(
      (acc, booking) => acc + booking.totalPrice,
      0
    );

    return res.json({
      success: true,
      dashboardData: {
        bookings,
        totalBookings,
        totalRevenue,
      },
    });

  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};


// verify stripe payment and confirm booking (used on success redirect — no webhook needed)
export const verifyStripePayment = async (req, res) => {
  try {
    const { bookingId } = req.body;
    if (!bookingId) return res.json({ success: false, message: "bookingId required" });

    const booking = await Booking.findById(bookingId);
    if (!booking) return res.json({ success: false, message: "Booking not found" });

    // Already confirmed — nothing to do
    if (booking.status === "confirmed" && booking.isPaid) {
      return res.json({ success: true, booking });
    }

    // Ask Stripe directly for the session status
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
    const sessions = await stripeInstance.checkout.sessions.list({
      limit: 10,
    });

    // Find the session whose metadata.bookingId matches
    const session = sessions.data.find(
      (s) => s.metadata?.bookingId === bookingId && s.payment_status === "paid"
    );

    if (!session) {
      console.log("No paid Stripe session found for bookingId:", bookingId);
      return res.json({ success: false, message: "Payment not completed" });
    }

    // Payment confirmed — update booking
    const updated = await Booking.findByIdAndUpdate(
      bookingId,
      { isPaid: true, paymentMethod: "Stripe", status: "confirmed" },
      { new: true }
    );

    console.log("✅ Payment verified and booking confirmed:", updated._id);
    return res.json({ success: true, booking: updated });
  } catch (error) {
    console.error("verifyStripePayment error:", error.message);
    return res.json({ success: false, message: error.message });
  }
};

// add payment methode

export const striptePayment = async (req, res) => {
  try {
    const { bookingId } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    if (booking.isPaid || booking.status === "confirmed") {
      return res.json({ success: false, message: "This booking is already paid" });
    }
    if (booking.status === "cancelled") {
      return res.json({ success: false, message: "This booking was cancelled. Please book again." });
    }

    // The hold may have expired and someone else may have booked these dates since
    const stillAvailable = await checkAvailability({
      room: booking.room,
      checkInDate: booking.checkInDate,
      checkOutDate: booking.checkOutDate,
      excludeBookingId: booking._id,
    });
    if (!stillAvailable) {
      await Booking.findByIdAndUpdate(booking._id, { status: "cancelled" });
      return res.json({
        success: false,
        message: "Sorry, these dates were booked by another guest. Please choose different dates.",
      });
    }
    booking.holdExpiresAt = holdUntil();
    await booking.save();

    const roomDate = await Room.findById(booking.room).populate('hotel');
    if (!roomDate || !roomDate.hotel) {
      return res.status(404).json({ success: false, message: "Room or Hotel not found" });
    }

    const amount = Math.round(Number(booking.totalPrice) * 100);
    if (!amount || amount <= 0) {
      return res.json({ success: false, message: "Invalid amount" });
    }

    const origin = req.headers.origin;

    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
    console.log('bookingId 1', bookingId);

    const line_items = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: roomDate.hotel.name,
          },
          unit_amount: amount,
        },
        quantity: 1,
      },
    ];
    console.log('bookingId 2', bookingId);

    const session = await stripeInstance.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${origin}/loader/my-bookings?bookingId=${bookingId}`,
      cancel_url: `${origin}/my-bookings`,
      metadata: { bookingId },
      expires_at: Math.floor(Date.now() / 1000) + STRIPE_SESSION_MINUTES * 60,
    });
    console.log('bookingId 3', bookingId);

    return res.json({ success: true, url: session.url });

  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


