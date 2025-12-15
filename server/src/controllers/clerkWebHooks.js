import User from "../../db/models/user.model.js";
import { Webhook } from "svix";

const clerkwebhooks = async (req, res) => {
  try {
    console.log("🔥 Clerk webhook hit");

    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    // RAW body
    const payload = req.body.toString();

    // verify
    await whook.verify(payload, headers);
    console.log("✅ Webhook verified");

    //  parse payload
    const { data, type } = JSON.parse(payload);

    console.log("TYPE:", type);

    const userData = {
      _id: data.id,
      email: data.email_addresses?.[0]?.email_address || "",
      username: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
      image: data.image_url,
    };

    switch (type) {
      case "user.created":
        await User.create(userData);
        console.log(" User created");
        break;

      case "user.updated":
        await User.findByIdAndUpdate(data.id, userData);
        console.log(" User updated");
        break;

      case "user.deleted":
        await User.findByIdAndDelete(data.id);
        console.log(" User deleted");
        break;
    }

    res.json({ success: true });
  } catch (error) {
    console.error(" Webhook error:", error);
    res.status(400).json({ success: false, err: error.message });
  }
};

export default clerkwebhooks;
