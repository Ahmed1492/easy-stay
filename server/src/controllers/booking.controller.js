import Booking from "../../db/models/booking.model.js";
import Hotel from "../../db/models/hotel.model.js";
import Room from "../../db/models/room.model.js";

// function to check room Availability
const checkAvailability = async ({ checkInDate, checkOutDate, room }) => {
  try {
    const bookings = await Booking.find({
      room,
      checkInDate: { $lte: checkOutDate },
      checkOutDate: { $gte: checkInDate }
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
    const isAvailable = await checkAvailability({ checkInDate, checkOutDate, room });
    return res.json({ success: true, isAvailable });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, err: error.message, stack: error.stack });

  }
};

// create new booking
export const createBooking = async (req, res) => {
  try {

    const { room, checkInDate, checkOutDate, guests } = req.body;
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
    const timeDiff = checkIn.getTime() - checkOut.getTime();
    const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
    totalPrice *= nights;

    const booking = await Booking.create({ user, room, hotel: roomData.hotel._id, checkInDate, checkOutDate, guests: +guests, totalPrice });

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


