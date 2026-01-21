import Hotel from "../../db/models/hotel.model.js";
import User from "../../db/models/user.model.js";

export const registerHotel = async (req, res, next) => {
  try {
    const { name, address, contact, city } = req.body;
    const owner = req.user._id;

    // check if user already registerd
    const isExistHotel = await Hotel.findOne({ owner });
    if (isExistHotel) {
      return res.json({ success: false, message: 'Hotel already registered' });
    }
    const hotel = await Hotel.create({ name, address, contact, city, owner });
    await User.findByIdAndUpdate(owner, { role: 'hotelOwner' });

    return res.json({ success: true, message: 'Hotel Registered Successfully', hotel });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, error: error.message, stack: error.stack });

  }
};