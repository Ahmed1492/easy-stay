import User from "../../db/models/user.model.js";
import Booking from "../../db/models/booking.model.js";

// get user data
export const getUserData = (req, res, next) => {
  try {
    const user = req.user;
    return res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, error: error.message, stack: error.stack });
  }
};

// get user profile — stats + recent bookings
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const bookings = await Booking.find({ user: userId })
      .populate("room hotel")
      .sort({ createdAt: -1 });

    const totalBookings = bookings.length;
    const completedBookings = bookings.filter((b) => b.status === "confirmed").length;
    const pendingBookings = bookings.filter((b) => b.status === "pending").length;
    const totalSpent = bookings
      .filter((b) => b.status === "confirmed")
      .reduce((sum, b) => sum + b.totalPrice, 0);

    return res.json({
      success: true,
      stats: { totalBookings, completedBookings, pendingBookings, totalSpent },
      recentBookings: bookings.slice(0, 5),
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, error: error.message, stack: error.stack });
  }
};

// store user searched cities
export const storeUserSearchCities = async (req, res) => {
  try {
    const { recentSearchedCity } = req.body;
    const user = await req.user;
    if (user.recentSearchedCities.length < 3) {
      user.recentSearchedCities.push(recentSearchedCity);
    } else {
      user.recentSearchedCities.shift();
      user.recentSearchedCities.push(recentSearchedCity);

    }
    await user.save();
    return res.json({ success: true, user, message: 'City added' });

  } catch (error) {
    console.log(error);
    return res.json({ success: false, error: error.message, stack: error.stack });
  }
};


export const getRecentSearch = async (req, res) => {
  try {
    const user = await req.user;
    if (!user)
      return res.json({ success: false, message: 'user not found' });

    return res.json({ success: true, recentSearchedCities: user.recentSearchedCities });


  } catch (error) {
    console.log(error);
    return res.json({ success: false, error: error.message, stack: error.stack });
  }
};

