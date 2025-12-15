import User from "../../db/models/user.model.js";
import { Webhook } from "svix";

// ⚠️ Required for Vercel serverless
export const config = {
  api: {
    bodyParser: false,
  },
};

const clerkwebhooks = async (req, res) => {
  try {
    console.log("🔥 Webhook hit");

    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    // ✅ Verify using raw body
    await whook.verify(req.rawBody, headers);
    console.log("✅ Webhook verified");

    const payload = JSON.parse(req.rawBody.toString());
    const { data, type } = payload;

    const userData = {
      _id: data.id,
      email: data.email_addresses?.[0]?.email_address || "",
      username: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
      image: data.image_url || "",
    };

    switch (type) {
      case "user.created":
        await User.create(userData);
        console.log("✅ User created:", userData);
        break;
      case "user.updated":
        await User.findByIdAndUpdate(data.id, userData);
        console.log("✅ User updated:", userData);
        break;
      case "user.deleted":
        await User.findByIdAndDelete(data.id);
        console.log("✅ User deleted:", data.id);
        break;
      default:
        console.log("⚠️ Unknown webhook type:", type);
        break;
    }

    res.json({ success: true, message: "Webhook Received" });
  } catch (error) {
    console.error("❌ Webhook error:", error);
    res.status(400).json({ success: false, err: error.message });
  }
};

export default clerkwebhooks;
