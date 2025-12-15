import express from 'express';
import cors from 'cors';
import "dotenv/config";
import { connect } from './db/connection.js';
import { clerkMiddleware } from '@clerk/express';
import clerkwebhooks from './src/controllers/clerkWebHooks.js';

connect();

const app = express();
const port = process.env.PORT || 3000;

/* -------------------- CLERK WEBHOOK (RAW BODY) -------------------- */
app.post(
  '/api/clerk/webhook',
  express.raw({ type: 'application/json' }),
  clerkwebhooks
);

/* -------------------- NORMAL MIDDLEWARES -------------------- */
app.use(express.json());
app.use(cors());

/* -------------------- CLERK AUTH (FOR NORMAL ROUTES ONLY) -------------------- */
app.use(clerkMiddleware());

/* -------------------- ROUTES -------------------- */
app.get('/', (req, res) => {
  res.send('API IS WORKING !');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
