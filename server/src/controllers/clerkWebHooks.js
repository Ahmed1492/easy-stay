import User from "../../db/models/user.model.js";
import { Webhook } from "svix";

const clerkwebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    // verify using raw body
    await whook.verify(req.rawBody, headers);

    const { data, type } = req.body;

    const userData = {
      _id: data.id,
      email: data.email_addresses[0].email_address,
      username: `${data.first_name} ${data.last_name}`,
      image: data.image_url,
    };

    switch (type) {
      case "user.created":
        await User.create(userData);
        break;
      case "user.updated":
        await User.findOneAndUpdate({ clerkId: data.id }, userData);
        break;
      case "user.deleted":
        await User.findOneAndDelete({ clerkId: data.id });
        break;
      default:
        break;
    }

    res.json({ success: true, message: "Webhook Received" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, err: error.message });
  }
};

export default clerkwebhooks;