import stripe from "stripe";
import Booking from "../../db/models/booking.model.js";

// handle stripe webhooks
export const stripeWebHooks = async (request, response) => {
  const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripeInstance.webhooks.constructEvent(
      request.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    return response.status(400).send(`Webhook Error: ${error.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const { bookingId } = session.metadata;

    await Booking.findByIdAndUpdate(bookingId, {
      isPaid: true,
      payment: "Stripe"
    });
  }

  response.json({ received: true });
};
