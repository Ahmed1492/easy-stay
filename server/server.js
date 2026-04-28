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

// ── CORS — allow all origins (handles preflight OPTIONS too) ──────────────
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'ngrok-skip-browser-warning'],
  credentials: false,
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // handle preflight for all routes

// ── Stripe webhook (needs raw body, must come before express.json) ────────
app.post('/api/stripe', express.raw({ type: "application/json" }), stripeWebHooks);

// ── Body parser (captures raw body for Clerk webhook verification) ────────
app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);

// ── Clerk webhook (no clerkMiddleware) ────────────────────────────────────
app.post('/api/clerk', clerkwebhooks);

// ── All other routes use clerkMiddleware ──────────────────────────────────
app.use(clerkMiddleware());

app.use('/api/user', userRouter);
app.use('/api/hotels', hotelRouter);
app.use('/api/rooms', roomRouter);
app.use('/api/booking', bookingRouter);

app.get('/', (req, res) => {
  res.send('QuickStay API is running');
});

// Export for Vercel serverless — don't call app.listen() in production
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server running on port: http://localhost:${port}/`);
  });
}

export default app;