# 🏨 QuickStay - Hotel Booking Platform

A modern, full-stack MERN hotel booking platform that provides seamless hotel search, booking, and management experiences. Built with React, Node.js, Express, MongoDB, and integrated with Clerk authentication, Stripe payments, and Cloudinary image storage.

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Demo](#demo)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

### 🔍 Advanced Search & Discovery
- **Smart Search**: Search hotels by city, hotel name, or address
- **Advanced Filters**: Filter by price range, room type, and amenities
- **Multiple Sort Options**: Sort by price (low to high, high to low) or rating
- **View Modes**: Toggle between grid and list views
- **Quick View Modal**: Preview room details without leaving the search page
- **Recent Searches**: Track and revisit recent search queries

### 👤 User Features
- **Secure Authentication**: Powered by Clerk with email/social login
- **User Profile**: Comprehensive profile with booking stats and history
- **Booking Management**: View, filter, and manage all bookings (upcoming, completed, cancelled)
- **Favorites**: Save favorite hotels for quick access
- **Responsive Design**: Seamless experience across all devices

### 🏨 Hotel Owner Features
- **Hotel Registration**: Register and manage multiple hotels
- **Room Management**: Add, edit, and delete rooms with ease
- **Dashboard Analytics**: Track bookings, revenue, and performance metrics
- **Booking Overview**: View and manage all hotel bookings
- **Image Upload**: Cloudinary integration for high-quality image storage

### 💳 Payments & Booking
- **Stripe Integration**: Secure payment processing
- **Real-time Availability**: Check room availability by dates
- **Booking Confirmation**: Instant confirmation with booking details
- **Payment Status**: Track payment status for each booking
- **Multiple Payment Methods**: Support for various payment options

### 🎨 Modern UI/UX
- **Beautiful Design**: Clean, professional interface with smooth animations
- **Skeleton Loaders**: Better loading states for improved UX
- **Toast Notifications**: Real-time feedback for user actions
- **Scroll to Top**: Automatic scroll on navigation
- **Hover Effects**: Engaging interactions throughout the app
- **Responsive Navigation**: Mobile-friendly menu and navigation

---

## 🛠 Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM v6** - Client-side routing
- **Clerk React** - Authentication
- **Axios** - HTTP client
- **React Hot Toast** - Notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **Clerk** - Authentication & user management
- **Stripe** - Payment processing
- **Cloudinary** - Image storage and optimization
- **Multer** - File upload handling

---

<<<<<<< HEAD
## 🎥 Demo

- 🔴 **Live Demo**: [https://easy-stay-rouge.vercel.app/](https://easy-stay-rouge.vercel.app/)
- 📂 **GitHub Repository**: [Repository Link](#)

---

## 📁 Project Structure
=======
##  Demo
- 🔴 **Live Demo:** [Live Demo](https://easy-stay-rouge.vercel.app/)  
- 📼 **Recorded Demo:** [Recorded Demo](https://www.linkedin.com/posts/activity-7420069623099908096-5CM6?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD-hKsAB1QXZ1eSyBx8nGWP48RuYiBX5Bdg)  

---


## 🧱 Tech Stack

### 🎨 Frontend
- #ReactJS  
- #Clerk (Authentication)  
- #Axios  
- #ReactHotToast  
- #TailwindCSS  

### ⚙️ Backend
- #NodeJS & #ExpressJS  
- #MongoDB & #Mongoose  
- #Clerk (Auth & Webhooks)  
- #Stripe (Payments)  
- #Cloudinary & #Multer (Image uploads)  
- #Nodemailer (Email notifications)  
- #Svix (Webhook verification)  


---



## 🏨 Hotel Search & Filtering
- Search hotels by city  
- View all hotels with dynamic filtering  
- Get **recommended hotels** based on search criteria  
- Filter by room type (Single, Double, Luxury, Family)  
- Filter by price range  
- Sort results by price or newest listings  
- Clear all filters instantly  

>>>>>>> f08e1d7f5baba3844f3c47fd2bc834a3781fce77

```
easy-stay/
├── client/                    # Frontend React application
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── assets/          # Images, icons, SVGs
│   │   ├── components/      # Reusable components
│   │   ├── context/         # React Context (global state)
│   │   ├── pages/           # Page components
│   │   ├── App.jsx          # Main app component
│   │   ├── main.jsx         # Entry point
│   │   └── index.css        # Global styles
│   ├── package.json
│   ├── vite.config.js
│   └── README.md            # Client documentation
│
├── server/                   # Backend Node.js application
│   ├── db/
│   │   ├── connection.js    # MongoDB connection
│   │   └── models/          # Mongoose models
│   ├── routes/              # API routes
│   ├── middleware/          # Custom middleware
│   ├── controllers/         # Route controllers
│   ├── utils/               # Utility functions
│   ├── server.js            # Entry point
│   ├── package.json
│   └── README.md            # Server documentation
│
├── rooms/                    # Sample room images
└── README.md                 # This file
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn
- Clerk account
- Stripe account
- Cloudinary account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd easy-stay
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Set up environment variables**
   - Create `.env` files in both `server` and `client` directories
   - See [Environment Variables](#environment-variables) section below

5. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   ```

6. **Start the backend server**
   ```bash
   cd server
   npm start
   # Server runs on http://localhost:5000
   ```

7. **Start the frontend development server**
   ```bash
   cd client
   npm run dev
   # Client runs on http://localhost:5173
   ```

---

## 🔐 Environment Variables

### Server (.env)

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/quickstay
# OR MongoDB Atlas:
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/quickstay

# Clerk Authentication
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Stripe Payment
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

### Client (.env)

```env
# Backend API
VITE_BACKEND_URL=http://localhost:5000

# Clerk Authentication
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

# App Configuration
VITE_CURRENCY=$
VITE_APP_NAME=QuickStay
VITE_APP_URL=http://localhost:5173
```

### Getting API Keys

1. **MongoDB Atlas**: [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. **Clerk**: [clerk.com](https://clerk.com)
3. **Stripe**: [stripe.com](https://stripe.com)
4. **Cloudinary**: [cloudinary.com](https://cloudinary.com)

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Main Endpoints

#### User Routes
- `GET /user` - Get current user info
- `GET /user/profile` - Get user profile with stats
- `POST /user/store-recent-search` - Store recent search

#### Hotel Routes
- `POST /hotel/register` - Register new hotel (Owner only)
- `GET /hotel/owner-hotels` - Get hotels by owner (Owner only)
- `GET /hotel/:id` - Get hotel by ID
- `PUT /hotel/:id` - Update hotel (Owner only)
- `DELETE /hotel/:id` - Delete hotel (Owner only)

#### Room Routes
- `POST /rooms/add` - Add new room (Owner only)
- `GET /rooms` - Get all rooms
- `GET /rooms/:id` - Get room by ID
- `GET /rooms/hotel/:hotelId` - Get rooms by hotel
- `PUT /rooms/:id` - Update room (Owner only)
- `DELETE /rooms/:id` - Delete room (Owner only)

#### Booking Routes
- `POST /booking/create` - Create new booking
- `GET /booking/user-bookings` - Get user's bookings
- `GET /booking/hotel-bookings/:hotelId` - Get hotel bookings (Owner only)
- `GET /booking/:id` - Get booking by ID
- `PUT /booking/:id/status` - Update booking status (Owner only)
- `POST /booking/stripe-payment` - Create Stripe payment
- `DELETE /booking/:id` - Cancel booking

For detailed API documentation, see [server/README.md](server/README.md)

---

## 🎨 Key Features Implementation

### Search Functionality
The search page (`/search`) provides advanced filtering with:
- Destination search (city, hotel name, address)
- Date range selection
- Guest count
- Price range slider
- Room type filtering
- Amenities filtering
- Sort options (recommended, price, rating)
- Grid/List view toggle

### Booking Flow
1. User searches for hotels
2. Views room details or quick preview
3. Checks availability for specific dates
4. Enters booking information
5. Proceeds to Stripe payment
6. Receives booking confirmation

### Authentication Flow
1. User clicks Login/Signup
2. Clerk modal opens
3. User authenticates via email or social login
4. Redirected to profile or intended page
5. JWT token stored automatically

### Payment Flow
1. User completes booking form
2. Redirected to Stripe checkout
3. Completes payment
4. Stripe webhook updates booking status
5. User receives confirmation

---

## 📱 Pages Overview

### Public Pages
- **Home** (`/`) - Hero section, featured hotels, exclusive offers
- **Search** (`/search`) - Advanced search with filters
- **All Rooms** (`/rooms`) - Browse all available rooms
- **Room Details** (`/room/:id`) - Detailed room information and booking
- **Experience** (`/experience`) - Experiences and activities
- **About** (`/about`) - About the platform

### Protected Pages (Require Login)
- **Profile** (`/profile`) - User profile with stats and settings
- **My Bookings** (`/my-bookings`) - Booking history and management

### Hotel Owner Pages
- **Dashboard** (`/owner`) - Analytics and overview
- **Add Room** (`/owner/add-room`) - Add new room
- **List Rooms** (`/owner/list-room`) - Manage all rooms

---

## 🎯 Design System

### Color Palette
- **Primary**: Gray-900 (#111827)
- **Secondary**: Gray-800 (#1f2937)
- **Accent**: Blue-600, Green-600, Orange-600
- **Text**: Gray-900 (headings), Gray-600 (body)
- **Background**: Gray-50, White

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Outfit (sans-serif)
- **Monospace**: Roboto Mono

### Animations
- Fade in, slide up, scale in
- Hover effects on cards and buttons
- Smooth transitions throughout

---

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Error**
- Ensure MongoDB is running
- Check connection string in `.env`
- Whitelist your IP in MongoDB Atlas

**Clerk Authentication Error**
- Verify Clerk API keys
- Check Clerk dashboard settings
- Ensure correct domain configuration

**Stripe Payment Error**
- Verify Stripe API keys
- Check webhook secret
- Use Stripe test cards for development

**Image Upload Error**
- Verify Cloudinary credentials
- Check file size limits
- Ensure proper file format

For more troubleshooting, see:
- [Client README](client/README.md)
- [Server README](server/README.md)

---

## 📚 Additional Documentation

- **Client Documentation**: [client/README.md](client/README.md)
- **Server Documentation**: [server/README.md](server/README.md)
- **React Documentation**: [react.dev](https://react.dev/)
- **Express Documentation**: [expressjs.com](https://expressjs.com/)
- **MongoDB Documentation**: [docs.mongodb.com](https://docs.mongodb.com/)

---

## 🚀 Deploying to Vercel

Both the client and server are deployed as **separate Vercel projects**.

---

### Deploy the Frontend (Client)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project** → import your repo
3. Set **Root Directory** to `client`
4. Vercel auto-detects Vite — framework preset will be set automatically
5. Add these **Environment Variables** in the Vercel dashboard:

```
VITE_BACKEND_URL=https://your-server.vercel.app
VITE_CLERK_PUBLISHABLE_KEY=pk_live_...
VITE_CURRENCY=$
```

6. Click **Deploy**

The `client/vercel.json` handles SPA routing so all routes resolve to `index.html`.

---

### Deploy the Backend (Server)

1. Go to [vercel.com](https://vercel.com) → **New Project** → import the same repo
2. Set **Root Directory** to `server`
3. Add these **Environment Variables** in the Vercel dashboard:

```
PORT=3000
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/quickstay
CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=https://your-client.vercel.app
```

4. Click **Deploy**

The `server/vercel.json` routes all requests through `server.js` as a serverless function.

---

### After Deploying Both

- Copy the **server URL** (e.g. `https://quickstay-api.vercel.app`) into the client's `VITE_BACKEND_URL` env var
- Copy the **client URL** into the server's `FRONTEND_URL` env var
- Redeploy both if you changed env vars
- Update your **Stripe webhook** endpoint to `https://your-server.vercel.app/api/stripe`
- Update your **Clerk** allowed origins to include both URLs

---

### Important Notes

- MongoDB Atlas: whitelist `0.0.0.0/0` (all IPs) since Vercel uses dynamic IPs
- Stripe webhooks: use the live webhook secret from the Stripe dashboard, not the CLI secret
- Clerk: add your Vercel domains to the allowed origins in the Clerk dashboard

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👥 Support

For support and questions:
- **Email**: support@quickstay.com
- **Issues**: [GitHub Issues](https://github.com/your-repo/issues)
- **Documentation**: See README files in client and server directories

---

## 🙏 Acknowledgments

- **Clerk** for authentication
- **Stripe** for payment processing
- **Cloudinary** for image storage
- **MongoDB** for database
- **Vercel** for hosting

---

**Built with ❤️ using the MERN Stack**

**React** • **Node.js** • **Express** • **MongoDB** • **Tailwind CSS**  

