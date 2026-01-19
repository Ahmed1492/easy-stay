import stripe from "stripe";
import Booking from "../../db/models/booking.model.js";

// handle stripe webhooks
export const stripeWebHooks = async (req, res) => {
  const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripeInstance.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPTE_WEBHOOK_SECRET // fix spelling
    );
    console.log("Webhook verified successfully");
  } catch (err) {
    console.error("Webhook verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log("Event type:", event.type);

  // ✅ Listen to checkout.session.completed
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    console.log("Session received:", session);

    const bookingId = session.metadata?.bookingId;
    console.log("Booking ID from metadata:", bookingId);

    if (!bookingId) {
      console.error("No bookingId in session metadata!");
      return res.status(400).send("No bookingId found");
    }

    try {
      const updatedBooking = await Booking.findByIdAndUpdate(
        bookingId,
        { isPaid: true, payment: "Stripe" },
        { new: true }
      );
      console.log("Booking updated:", updatedBooking);
    } catch (err) {
      console.error("Failed to update booking:", err.message);
    }
  } else {
    console.log("Unhandled event type:", event.type);
  }

  res.json({ received: true });
};

