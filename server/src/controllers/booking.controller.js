import Booking from "../../db/models/booking.model.js";
import Hotel from "../../db/models/hotel.model.js";
import Room from "../../db/models/room.model.js";
import transporter from "../config/nodemailer.js";
import stripe from 'stripe';
// function to check room Availability
const checkAvailability = async ({ checkInDate, checkOutDate, room }) => {
  try {
    const checkIn = new Date(checkInDate).toISOString().split('T')[0];
    const checkOut = new Date(checkOutDate).toISOString().split('T')[0];
    const bookings = await Booking.find({
      room,
      checkInDate: { $lte: checkOut },
      checkOutDate: { $gte: checkIn }
    });

    const isAvailable = bookings.length === 0;
    return isAvailable;
  } catch (error) {
    console.log(error);
    return res.json({ success: false, err: error.message, stack: error.stack });

  }
};

//  check room Availability
export const checkAvailabilityApi = async (req, res) => {
  try {

    const { checkInDate, checkOutDate, room } = req.body;
    const checkIn = new Date(checkInDate).toISOString().split('T')[0];
    const checkOut = new Date(checkOutDate).toISOString().split('T')[0];
    const isAvailable = await checkAvailability({ checkInDate, checkOutDate, room });
    return res.json({ success: true, isAvailable, checkIn, checkOut });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, err: error.message, stack: error.stack });

  }
};

// create new booking
export const createBooking = async (req, res) => {
  try {

    const { room, checkInDate, checkOutDate, guests, isPaid } = req.body;
    const user = req.user._id;
    const isAvilable = checkAvailability({ room, checkInDate, checkOutDate });
    if (!isAvilable) {
      return res.json({ success: false, message: 'room is not availble' });
    }

    // get total price
    const roomData = await Room.findById(room).populate("hotel");
    let totalPrice = await roomData.pricePerNight;


    // calculate total price per night
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const timeDiff = checkOut.getTime() - checkIn.getTime();
    const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
    totalPrice *= nights;

    const booking = await Booking.create({ user, room, hotel: roomData.hotel._id, checkInDate, checkOutDate, guests: +guests, totalPrice, isPaid });

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
      <li> <strong> Amount :</strong>  $ ${booking.totalPrice} / night</li>
      </ul>
      <p> We look forward to welcoming you!</p>
      <p> If you need to make any changes feel free to contact us.</p>


      `,
    };

    await transporter.sendMail(mailOptions);

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


// add payment methode

export const striptePayment = async (req, res) => {
  try {
    const { bookingId } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

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
      success_url: `${origin}/loader/my-bookings`,
      cancel_url: `${origin}/my-bookings`,
      metadata: { bookingId },
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


