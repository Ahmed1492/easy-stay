import express from 'express';
import cors from 'cors';
import "dotenv/config";
import { connect } from './db/connection.js';
import clerkwebhooks from './src/controllers/clerkWebHooks.js';

connect();

const app = express();
const port = process.env.PORT || 3000;

// Capture raw body for Clerk webhook verification
app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);
app.use(cors());

// Webhook endpoint (POST)
app.post('/api/clerk', clerkwebhooks);

// Routes
app.get('/', (req, res) => {
  res.send('Hello World! api works');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});