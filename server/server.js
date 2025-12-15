import express from 'express';
import cors from 'cors';
import "dotenv/config";
import { connect, connectDB } from './db/connection.js';
import { clerkMiddleware } from '@clerk/express';
import clerkwebhooks from './src/controllers/clerkWebHooks.js';
// connect with DB
connect();

const app = express();
const port = process.env.PORT || 3000;

// Middelwares
app.use(express.json());
app.use(cors());

// middleware to adds Clerk authentication to app.
app.use(clerkMiddleware());


// API to Listen Clerk Webhook
app.use('/api/clerk', clerkwebhooks)



// Routes



// check connection
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// check connection
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});