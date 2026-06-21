import stripe from "stripe";
import Booking from "../../db/models/booking.model.js";

// handle stripe webhooks
export const stripeWebHooks = async (req, res) => {
  console.log("\n========== STRIPE WEBHOOK HIT ==========");
  console.log("Timestamp:", new Date().toISOString());

  const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
  const sig = req.headers["stripe-signature"];

  console.log("stripe-signature header present:", !!sig);
  console.log("STRIPTE_WEBHOOK_SECRET present:", !!process.env.STRIPTE_WEBHOOK_SECRET);
  console.log("req.body type:", typeof req.body, "| is Buffer:", Buffer.isBuffer(req.body));

  let event;
  try {
    event = stripeInstance.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPTE_WEBHOOK_SECRET
    );
    console.log("✅ Webhook signature verified successfully");
  } catch (err) {
    console.error("❌ Webhook signature verification FAILED:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log("Event type:", event.type);
  console.log("Event ID:", event.id);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    console.log("\n--- checkout.session.completed ---");
    console.log("Session ID:", session.id);
    console.log("Payment status:", session.payment_status);
    console.log("Session metadata:", JSON.stringify(session.metadata));

    const bookingId = session.metadata?.bookingId;
    console.log("bookingId from metadata:", bookingId);

    if (!bookingId) {
      console.error("❌ No bookingId in session metadata — cannot update booking");
      return res.status(400).send("No bookingId found in metadata");
    }

    try {
      // Check booking exists before update
      const existingBooking = await Booking.findById(bookingId);
      console.log("Booking found before update:", existingBooking ? "YES" : "NO");
      if (existingBooking) {
        console.log("  Current status:", existingBooking.status);
        console.log("  Current isPaid:", existingBooking.isPaid);
        console.log("  Current paymentMethod:", existingBooking.paymentMethod);
      }

      // Update: isPaid, paymentMethod (correct field name), status → confirmed
      const updatedBooking = await Booking.findByIdAndUpdate(
        bookingId,
        {
          isPaid: true,
          paymentMethod: "Stripe",
          status: "confirmed",
        },
        { new: true }
      );

      if (updatedBooking) {
        console.log("✅ Booking updated successfully");
        console.log("  New status:", updatedBooking.status);
        console.log("  New isPaid:", updatedBooking.isPaid);
        console.log("  New paymentMethod:", updatedBooking.paymentMethod);
      } else {
        console.error("❌ Booking.findByIdAndUpdate returned null — bookingId not found in DB:", bookingId);
      }
    } catch (err) {
      console.error("❌ DB update failed:", err.message);
      console.error(err.stack);
    }
  } else {
    console.log("Unhandled event type (ignored):", event.type);
  }

  console.log("========== WEBHOOK DONE ==========\n");
  res.json({ received: true });
};
