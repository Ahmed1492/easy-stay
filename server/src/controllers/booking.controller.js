import Booking from "../../db/models/booking.model.js";
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
    const user = req.user._id
    const isAvilable = checkAvailability({ room, checkInDate, checkOutDate });
    if (!isAvilable) {
      return res.json({ success: false, message: 'room is not availble' });
    }

  } catch (error) {
    console.log(error);
    return res.json({ success: false, err: error.message, stack: error.stack });

  }

};