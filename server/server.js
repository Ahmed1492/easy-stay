import express from 'express';
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

// ── CORS — must be the very first middleware ──────────────────────────────
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, ngrok-skip-browser-warning');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

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

// ── Clerk webhook (no clerkMiddleware) ────────────────────────────────────
app.post('/api/clerk', clerkwebhooks);

// ── All other routes ──────────────────────────────────────────────────────
app.use(clerkMiddleware());

app.use('/api/user', userRouter);
app.use('/api/hotels', hotelRouter);
app.use('/api/rooms', roomRouter);
app.use('/api/booking', bookingRouter);

app.get('/', (req, res) => {
  res.send('Hello World! api works');
});

app.listen(port, () => {
  console.log(`Server running on port: http://localhost:${port}/`);
});
