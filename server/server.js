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

const app = express();

// ── CORS ──────────────────────────────────────────────────────────────────
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'ngrok-skip-browser-warning'],
  credentials: false,
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// ── Stripe webhook (raw body — before express.json) ───────────────────────
app.post('/api/stripe', express.raw({ type: 'application/json' }), stripeWebHooks);

// ── Body parser ───────────────────────────────────────────────────────────
app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);

// ── DB + Cloudinary (lazy — won't crash the function on cold start) ───────
let isConnected = false;
app.use(async (_req, _res, next) => {
  if (!isConnected) {
    try {
      await connect();
      connectCloudinary();
      isConnected = true;
    } catch (err) {
      console.error('DB/Cloudinary connection error:', err.message);
    }
  }
  next();
});

// ── Clerk webhook (no clerkMiddleware) ────────────────────────────────────
app.post('/api/clerk', clerkwebhooks);

// ── All other routes ──────────────────────────────────────────────────────
app.use(clerkMiddleware());

app.use('/api/user', userRouter);
app.use('/api/hotels', hotelRouter);
app.use('/api/rooms', roomRouter);
app.use('/api/booking', bookingRouter);

app.get('/', (_req, res) => {
  res.json({ success: true, message: 'QuickStay API is running' });
});

// ── Local dev only ────────────────────────────────────────────────────────
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Server: http://localhost:${port}`));
}

export default app;
