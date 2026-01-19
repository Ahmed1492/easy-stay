import stripe from "stripe";
import Booking from "../../db/models/booking.model.js";

// handle stripe webhooks
export const stripeWebHooks = async (request, response) => {
  // stripe gateway intialize
  const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
  const sig = request.headers['stripe-signatue'];
  let event;
  try {
    event = stripeInstance.webhooks.constructEvent(request.body, sig, process.env.STRIPTE_WEBHOOK_SECRET);
  } catch (error) {
    return response.stauts(400).send(`Webhook Error: ${error.message}`);
  }
  // handle the event
  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;
    const paymentIntentId = paymentIntent.id;

    // getting session metaData
    const session = await stripeInstance.checkout.sessions.list({
      payment_intent: paymentIntentId
    });
    const { bookingId } = session.data[0].metadata;

    // mark payment as paid
    await Booking.findByIdAndUpdate(bookingId, { isPaid: true, payment: "Stripe" });
  } else {
    console.log("Unhandled event type : ", event.type);

  }
  response.json({ received: true });
};