import express from 'express';
import "dotenv/config";
import mongoose from 'mongoose';
import clerkwebhooks from './src/middleware/clerkWebHooks.js';
import userRouter from './src/routes/user.router.js';
import hotelRouter from './src/routes/hotel.router.js';
import roomRouter from './src/routes/room.router.js';
import connectCloudinary from './src/config/cloudinary.js';
import bookingRouter from './src/routes/booking.router.js';
import { clerkMiddleware } from '@clerk/express';
import { stripeWebHooks } from './src/controllers/stripeWebHook.js';

const app = express();

// ── CORS — absolute first ─────────────────────────────────────────────────
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, ngrok-skip-browser-warning');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// ── DB connection — await before every request (cached after first) ───────
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(`${process.env.MONGODB_URL}/easy-stay`);
};

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('DB connect error:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── Cloudinary (once) ─────────────────────────────────────────────────────
connectCloudinary();

// ── Stripe webhook (raw body — before express.json) ───────────────────────
app.post('/api/stripe', express.raw({ type: 'application/json' }), stripeWebHooks);

// ── Body parser ───────────────────────────────────────────────────────────
app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);

// ── Clerk webhook ─────────────────────────────────────────────────────────
app.post('/api/clerk', clerkwebhooks);

// ── Routes ────────────────────────────────────────────────────────────────
app.use(clerkMiddleware());
app.use('/api/user', userRouter);
app.use('/api/hotels', hotelRouter);
app.use('/api/rooms', roomRouter);
app.use('/api/booking', bookingRouter);

app.get('/', (req, res) => {
  res.json({ success: true, message: 'QuickStay API is running' });
});

// ── Local dev ─────────────────────────────────────────────────────────────
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server: http://localhost:${port}`);
});

export default app;
