import User from "../../db/models/user.model.js";
import { Webhook } from "svix";


const clerkwebhooks = async (req, res) => {
  try {
    // create a svix instance with clerk webhook secret
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    // headers
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    // verify headers
    await whook.verify(JSON.stringify(req.body), headers);

    // getting data from request body
    const { data, type } = req.body;

    console.log('  data ', data);
    console.log('  type ', type);

    const userData = {
      _id: data.id,
      email: data.email_addresses[0].email_address,
      username: data.firstname + " " + data.lastname,
      image: data.image_url,

    };

    // switch case for different Events
    switch (type) {
      case "user.created": {
        await User.create(userData);
        break;
      }
      case "user.updated": {
        await User.findByIdAndUpdate(data.id, userData);
        break;
      }
      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        break;
      }
      default:
        break;
    }

    res.json({ success: true, message: 'Webhook Received' });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, err: error.message });
  }
};

export default clerkwebhooks; 