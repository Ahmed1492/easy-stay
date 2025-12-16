import User from "../../db/models/user.model.js";

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
    await User.save();
    return res.json({ success: true, user , message:'City added' });

  } catch (error) {
    console.log(error);
    return res.json({ success: false, error: error.message, stack: error.stack });
  }
};