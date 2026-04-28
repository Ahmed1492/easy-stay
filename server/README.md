# QuickStay Server - Backend API

A comprehensive hotel booking platform backend built with Node.js, Express, and MongoDB.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Database Models](#database-models)
- [Authentication](#authentication)
- [Payment Integration](#payment-integration)
- [Project Structure](#project-structure)
- [Running the Server](#running-the-server)

## ✨ Features

- **User Management**: User registration, authentication, and profile management
- **Hotel Management**: CRUD operations for hotels and rooms
- **Booking System**: Complete booking workflow with date validation
- **Payment Integration**: Stripe payment gateway integration
- **Image Upload**: Cloudinary integration for image storage
- **Role-Based Access**: User and Hotel Owner roles
- **Search & Filter**: Advanced search and filtering capabilities
- **Recent Searches**: Track user search history

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Clerk
- **Payment**: Stripe
- **Image Storage**: Cloudinary
- **File Upload**: Multer
- **Environment**: dotenv

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn package manager

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Create a `.env` file in the server root directory
   - Copy variables from `.env.example` (if available)
   - Fill in your credentials (see Environment Variables section)

4. **Start the server**
   ```bash
   npm start
   ```

## 🔐 Environment Variables

Create a `.env` file in the server directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/quickstay
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/quickstay

# Clerk Authentication
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Stripe Payment
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Cloudinary (Image Upload)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

### How to Get API Keys:

1. **MongoDB Atlas**: 
   - Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Create a cluster and get connection string

2. **Clerk**: 
   - Sign up at [clerk.com](https://clerk.com)
   - Create an application
   - Get API keys from dashboard

3. **Stripe**: 
   - Sign up at [stripe.com](https://stripe.com)
   - Get API keys from developers section

4. **Cloudinary**: 
   - Sign up at [cloudinary.com](https://cloudinary.com)
   - Get credentials from dashboard

## 📡 API Endpoints

### User Routes (`/api/user`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get current user info | ✅ |
| GET | `/profile` | Get user profile with stats | ✅ |
| POST | `/store-recent-search` | Store recent search city | ✅ |

### Hotel Routes (`/api/hotel`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Register new hotel | ✅ (Owner) |
| GET | `/owner-hotels` | Get hotels by owner | ✅ (Owner) |
| GET | `/:id` | Get hotel by ID | ❌ |
| PUT | `/:id` | Update hotel | ✅ (Owner) |
| DELETE | `/:id` | Delete hotel | ✅ (Owner) |

### Room Routes (`/api/rooms`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/add` | Add new room | ✅ (Owner) |
| GET | `/` | Get all rooms | ❌ |
| GET | `/:id` | Get room by ID | ❌ |
| GET | `/hotel/:hotelId` | Get rooms by hotel | ❌ |
| PUT | `/:id` | Update room | ✅ (Owner) |
| DELETE | `/:id` | Delete room | ✅ (Owner) |

### Booking Routes (`/api/booking`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/create` | Create new booking | ✅ |
| GET | `/user-bookings` | Get user's bookings | ✅ |
| GET | `/hotel-bookings/:hotelId` | Get hotel bookings | ✅ (Owner) |
| GET | `/:id` | Get booking by ID | ✅ |
| PUT | `/:id/status` | Update booking status | ✅ (Owner) |
| POST | `/stripe-payment` | Create Stripe payment | ✅ |
| DELETE | `/:id` | Cancel booking | ✅ |

## 🗄 Database Models

### User Model
```javascript
{
  _id: String,           // Clerk user ID
  username: String,
  email: String,
  image: String,
  role: String,          // 'user' or 'hotelOwner'
  recentSearchedCities: [String],
  timestamps: true
}
```

### Hotel Model
```javascript
{
  name: String,
  description: String,
  address: String,
  city: String,
  country: String,
  images: [String],      // Cloudinary URLs
  amenities: [String],
  rating: Number,
  owner: String,         // User ID reference
  timestamps: true
}
```

### Room Model
```javascript
{
  hotel: ObjectId,       // Hotel reference
  roomType: String,
  description: String,
  pricePerNight: Number,
  capacity: Number,
  amenities: [String],
  images: [String],
  isAvailable: Boolean,
  timestamps: true
}
```

### Booking Model
```javascript
{
  user: String,          // User ID reference
  hotel: String,         // Hotel ID reference
  room: String,          // Room ID reference
  checkInDate: Date,
  checkOutDate: Date,
  totalPrice: Number,
  guests: Number,
  status: String,        // 'pending', 'confirmed', 'cancelled'
  paymentMethod: String,
  isPaid: Boolean,
  timestamps: true
}
```

## 🔒 Authentication

The API uses **Clerk** for authentication. Protected routes require a valid JWT token in the Authorization header:

```
Authorization: Bearer <clerk_jwt_token>
```

### Middleware

- `authenticateUser`: Verifies Clerk JWT token
- `requireOwner`: Checks if user has 'hotelOwner' role

## 💳 Payment Integration

### Stripe Payment Flow

1. **Create Payment Intent**
   ```javascript
   POST /api/booking/stripe-payment
   Body: { bookingId: "booking_id" }
   ```

2. **Redirect to Stripe Checkout**
   - User completes payment on Stripe
   - Redirected back to success/cancel URL

3. **Webhook Handler**
   - Stripe sends webhook on payment success
   - Booking status updated automatically

### Webhook Setup

Configure Stripe webhook URL:
```
https://your-domain.com/api/booking/webhook
```

Events to listen for:
- `checkout.session.completed`
- `payment_intent.succeeded`

## 📁 Project Structure

```
server/
├── db/
│   ├── connection.js          # MongoDB connection
│   └── models/
│       ├── user.model.js      # User schema
│       ├── hotel.model.js     # Hotel schema
│       ├── room.model.js      # Room schema
│       └── booking.model.js   # Booking schema
├── routes/
│   ├── user.routes.js         # User endpoints
│   ├── hotel.routes.js        # Hotel endpoints
│   ├── room.routes.js         # Room endpoints
│   └── booking.routes.js      # Booking endpoints
├── middleware/
│   ├── auth.middleware.js     # Authentication
│   └── upload.middleware.js   # File upload
├── controllers/
│   ├── user.controller.js
│   ├── hotel.controller.js
│   ├── room.controller.js
│   └── booking.controller.js
├── utils/
│   ├── cloudinary.js          # Image upload utility
│   └── stripe.js              # Payment utility
├── .env                       # Environment variables
├── .gitignore
├── package.json
├── server.js                  # Entry point
└── README.md
```

## 🏃 Running the Server

### Development Mode
```bash
npm run server
```

### Production / Vercel Deployment

1. Push your repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → import repo
3. Set **Root Directory** to `server`
4. Add all environment variables in the Vercel dashboard (see above)
5. Click **Deploy**

The `vercel.json` in this folder routes all requests to `server.js` as a Node.js serverless function.

> **MongoDB Atlas**: whitelist `0.0.0.0/0` in Network Access since Vercel uses dynamic IPs.
> **Stripe**: update your webhook endpoint to `https://your-server.vercel.app/api/stripe` after deploying.

## 🧪 Testing

### Test API with cURL

**Get all rooms:**
```bash
curl http://localhost:5000/api/rooms
```

**Create booking (with auth):**
```bash
curl -X POST http://localhost:5000/api/booking/create \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "roomId": "room_id",
    "checkInDate": "2024-06-01",
    "checkOutDate": "2024-06-05",
    "guests": 2
  }'
```

## 🐛 Common Issues

### MongoDB Connection Error
- Ensure MongoDB is running
- Check connection string in `.env`
- Whitelist your IP in MongoDB Atlas

### Clerk Authentication Error
- Verify Clerk API keys
- Check token format in Authorization header
- Ensure Clerk app is properly configured

### Stripe Payment Error
- Verify Stripe API keys
- Check webhook secret
- Test with Stripe test cards

### Image Upload Error
- Verify Cloudinary credentials
- Check file size limits
- Ensure proper file format (jpg, png)

## 📝 API Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

## 🔧 Configuration

### CORS Settings
Update `server.js` to allow your frontend domain:
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
```

### Rate Limiting
Consider adding rate limiting for production:
```bash
npm install express-rate-limit
```

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Clerk Documentation](https://clerk.com/docs)
- [Stripe API Reference](https://stripe.com/docs/api)
- [Cloudinary Documentation](https://cloudinary.com/documentation)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Support

For support, email support@quickstay.com or open an issue in the repository.

---

**Built with ❤️ by the QuickStay Team**
