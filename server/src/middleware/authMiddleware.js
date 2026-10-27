import { clerkClient } from "@clerk/express";
import User from "../../db/models/user.model.js";

const isAuth = async (req, res, next) => {
  try {
    const userId = req.auth?.userId;

    if (!userId) {
      return res.json({ success: false, message: "You are not authorized, login first" });
    }

    let user = await User.findById(userId);

    // User authenticated with Clerk but not yet in our DB
    // (webhook may have missed the user.created event)
    if (!user) {
      const clerkUser = await clerkClient.users.getUser(userId);

      user = await User.create({
        _id: clerkUser.id,
        email: clerkUser.emailAddresses?.[0]?.emailAddress || "",
        username: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() || "User",
        image: clerkUser.imageUrl || "",
      });

      console.log("Auto-created missing user in DB:", user._id);
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.json({ success: false, error: error.message, stack: error.stack });
  }
};

export default isAuth;
