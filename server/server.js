import express from 'express';
import cors from 'cors';
import "dotenv/config";
import { connect } from './db/connection.js';
import clerkwebhooks from './src/middleware/clerkWebHooks.js';
import userRouter from './src/routes/user.router.js';
import hotelRouter from './src/routes/hotel.router.js';
import roomRouter from './src/routes/room.router.js';
import connectCloudinary from './src/config/cloudinary.js';
import bookingRouter from './src/routes/booking.router.js';
import { clerkMiddleware } from '@clerk/express';
import { stripeWebHooks } from './src/controllers/stripeWebHook.js';
connect();
connectCloudinary();
const app = express();
const port = process.env.PORT || 3000;



// API to listen to Stripe Webhooks
app.post('/api/stripe', express.raw({ type: "application/json" }), stripeWebHooks);


// Capture raw body for Clerk webhook verification
app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);
app.use(cors());



// Webhook endpoint (POST) : Webhook route → NO clerkMiddleware
app.post('/api/clerk', clerkwebhooks);

// All other routes → use clerkMiddleware
app.use(clerkMiddleware());

// Routes
app.use('/api/user', userRouter);
app.use('/api/hotels', hotelRouter);
app.use('/api/rooms', roomRouter);
app.use('/api/booking', bookingRouter);

app.get('/', (req, res) => {
  res.send('Hello World! api works ');
});

app.listen(port, () => {
  console.log(`Server running on port : http://localhost:${port}/`);
});