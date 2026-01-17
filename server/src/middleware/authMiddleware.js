// middleware to check user authentication

import User from "../../db/models/user.model.js";

const isAuth = async (req, res, next) => {
  try {

    const userId = req.auth?.userId;
    // console.log('userId ', userId);
    if (!userId) {
      return res.json({ success: false, message: 'you are not authorized , login First' });
    } else {
      const user = await User.findById(userId);
      req.user = user;
      next();
    }

  } catch (error) {
    console.log(error);
    return res.json({ success: false, error: error.message, stack: error.stack });
  }
};

export default isAuth;