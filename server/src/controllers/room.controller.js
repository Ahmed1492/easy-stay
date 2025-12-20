import { v2 as cloudinary } from "cloudinary";
import Hotel from "../../db/models/hotel.model.js";
import Room from "../../db/models/room.model.js";


// create new room
export const createRoom = async (req, res) => {
  try {
    const { roomType, pricePerNight, amenities } = req.body;
    const hotel = await Hotel.findOne({ owner: req.auth.userId });

    if (!hotel)
      return res.json({ success: false, message: 'hotel is not exist' });


    // upload images to cloudinary
    const uploadImages = req.files.map(async (file) => {
      const response = await cloudinary.uploader.upload(file.path);
      return response.secure_url;
    });

    // waits for all uploads to complete
    const images = await Promise.all(uploadImages);

    // create new room 
    const room = await Room.create({ hotel: hotel._id, roomType, pricePerNight: +pricePerNight, amenities: JSON.parse(amenities), images });


    return res.json({ success: true, message: "Room Created Successfully", room });

  } catch (error) {
    console.log(error);
    return res.json({ success: false, error: error.message, stack: error.stack });

  }
};

// get all rooms
export const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ isAvailable: true }).populate({
      path: 'hotel',
      populate: {
        path: 'owner',
        select: 'image'
      }
    }).sort({ createdAt: -1 });
    return res.json({ success: true, rooms });

  } catch (error) {
    console.log(error);
    return res.json({ success: false, error: error.message, stack: error.stack });
  }
};

// get all rooms for specific hotel
export const getOwnerRooms = async (req, res) => {
  try {
    const hotelData = await Hotel.findOne({ owner: req.auth.userId });
    const hotelExist = await Hotel.findById(hotelData);
    if (!hotelExist)
      return res.json({ success: false, message: 'hotel is not exist' });

    const rooms = await Room.find({ hotel: hotelData._id.toString() }).populate('hotel');
    return res.json({ success: true, rooms });

  } catch (error) {
    console.log(error);
    return res.json({ success: false, error: error.message, stack: error.stack });
  }
};

// toggle room availability
export const toggleAvailability = async (req, res) => {
  try {
    const { roomId } = req.body;
 
    const room = await Room.findById(roomId);
    if (!room) {
      return res.json({ success: false, message: "Room not found" });
    }
    // toggle
    room.isAvailable = !room.isAvailable;

    await room.save();
    return res.json({
      success: true,
      message: 'room toggled successfully',
      room
    });

  } catch (error) {
    console.error(error);
    return res.json({
      success: false,
      error: error.message,
    });
  }
};

