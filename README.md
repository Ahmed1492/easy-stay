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
- [Booking Flow](#booking-flow)
- [Deploying to Vercel](#deploying-to-vercel)
- [Contributing](#contributing)
- [License](#license)

---

## 🎥 Demo

[![Live Demo](https://img.shields.io/badge/View%20Live-Vercel-blue?style=for-the-badge&logo=vercel)](https://easy-stay-rouge.vercel.app/)

[![Recorded Demo](https://img.shields.io/badge/Watch%20Demo-LinkedIn-green?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/posts/activity-7420069623099908096-5CM6?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD-hKsAB1QXZ1eSyBx8nGWP48RuYiBX5Bdg)

---

## ✨ Features

### 🔍 Advanced Search & Discovery
- Smart search by city, hotel name, or address
- Filter by price range, room type, and amenities
- Sort by price or rating
- Toggle between grid and list views
- Quick view modal to preview rooms without leaving search
- Recent searches tracked per user

### 👤 User Features
- Secure authentication via Clerk (email + social login)
- Profile page with real booking stats (total, pending, completed, total spent)
- Recent booking activity on profile overview
- Booking management with Completed / Pending filters
- Printable receipt modal for confirmed bookings
- Responsive design across all devices

### 🏨 Hotel Owner Features
- Register and manage hotels
- Add, edit, and delete rooms
- Dashboard analytics: total bookings and revenue
- View all hotel bookings with guest details
- Cloudinary integration for room image uploads

### 💳 Payments & Booking
- Two payment options at checkout: **Pay with Stripe** or **Pay At Hotel**
- Pay At Hotel → booking created as `pending`, upgradeable to Stripe later
- Pay with Stripe → redirects to Stripe Checkout, booking confirmed automatically on return
- Stripe payment verification on redirect (works locally without webhook setup)
- Stripe webhook as a backup for production confirmation
- Pay At Hotel bookings show a **Pay with Stripe** button on My Bookings to upgrade
- Booking receipt modal with print/PDF support for confirmed bookings

### 🎨 Modern UI/UX
- Clean, professional interface with Tailwind CSS
- Skeleton loaders for improved loading states
- Toast notifications for all user actions
- Smooth transitions and hover effects throughout

---

## 🛠 Tech Stack

### Frontend
- **React 18** — UI library
- **Vite** — build tool and dev server
- **Tailwind CSS** — utility-first styling
- **React Router DOM v6** — client-side routing
- **Clerk React** — authentication
- **Axios** — HTTP client
- **React Hot Toast** — notifications

### Backend
- **Node.js + Express.js** — server and API
- **MongoDB + Mongoose** — database and ODM
- **Clerk** — authentication and webhook verification
- **Stripe** — payment processing
- **Cloudinary + Multer** — image storage and upload
- **Nodemailer** — booking confirmation emails
- **Svix** — Clerk webhook verification

---

## 📁 Project Structure

```
easy-stay/
├── client/                    # Frontend React application
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── assets/          # Images, icons, SVGs
│   │   ├── components/      # Reusable components
│   │   │   ├── Loader.jsx               # Verifies Stripe payment on redirect
│   │   │   ├── RoomCheckAvailabiltiy.jsx # Availability check + payment choice
│   │   │   └── ...
│   │   ├── context/         # AppContext — global state
│   │   ├── pages/
│   │   │   ├── MyBookings.jsx   # Booking list with filters + receipt modal
│   │   │   ├── Profile.jsx      # User profile, stats, recent bookings
│   │   │   └── ...
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── vite.config.js
│
├── server/
│   ├── db/
│   │   └── models/
│   │       ├── booking.model.js   # Booking schema
│   │       ├── hotel.model.js
│   │       ├── room.model.js
│   │       └── user.model.js
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── booking.controller.js    # Booking logic + Stripe verify
│   │   │   ├── stripeWebHook.js         # Stripe webhook handler
│   │   │   └── user.controller.js       # User data + profile stats
│   │   ├── routes/
│   │   │   ├── booking.router.js
│   │   │   └── user.router.js
│   │   └── middleware/
│   └── server.js
│
├── rooms/                    # Sample room images
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v14+
- MongoDB (local or Atlas)
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

4. **Set up environment variables** — see section below

5. **Start the backend**
   ```bash
   cd server
   npm start
   # runs on http://localhost:3000
   ```

6. **Start the frontend**
   ```bash
   cd client
   npm run dev
   # runs on http://localhost:5173
   ```

---

## 🔐 Environment Variables

### Server (`server/.env`)

```env
PORT=3000
MONGODB_URL=mongodb+srv://<user>:<pass>@cluster.mongodb.net

CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_WEBHOOK_SECRET=whsec_...

STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPTE_WEBHOOK_SECRET=whsec_...   # note: matches the typo in .env

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

SENDER_EMAIL=your_email@example.com
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password

FRONTEND_URL=http://localhost:5173
```

### Client (`client/.env`)

```env
VITE_BACKEND_URL=http://localhost:3000
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
VITE_CURRENCY=$
```

---

## 📡 API Documentation

### Base URL
```
http://localhost:3000/api
```

### User Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/user` | Get current user data |
| GET | `/user/profile` | Get profile stats + recent bookings |
| POST | `/user/store-recent-search` | Store recent searched city |
| GET | `/user/recent-search` | Get recent searched cities |

### Hotel Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/hotels/register` | Register new hotel (owner) |
| GET | `/hotels` | Get all hotels |
| GET | `/hotels/:id` | Get hotel by ID |

### Room Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/rooms/add` | Add new room (owner) |
| GET | `/rooms` | Get all rooms |
| GET | `/rooms/:id` | Get room by ID |

### Booking Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/booking/check-availability` | Check room availability |
| POST | `/booking/create` | Create a new booking |
| GET | `/booking/user-bookings` | Get all bookings for current user |
| GET | `/booking/hotel-bookings` | Get hotel bookings (owner) |
| POST | `/booking/stripe-payment` | Create Stripe checkout session |
| POST | `/booking/verify-payment` | Verify Stripe payment on redirect |

### Stripe Webhook
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/stripe` | Stripe webhook (raw body) |

---

## 💳 Booking Flow

### Pay At Hotel
1. User checks availability on room page
2. Clicks **Pay At Hotel** → booking created with `status: pending`, `paymentMethod: "Pay At Hotel"`
3. Booking appears in My Bookings as **Pending**
4. User can click **Pay with Stripe** on the booking card to upgrade and pay online

### Pay with Stripe
1. User checks availability on room page
2. Clicks **Pay Now with Stripe** → booking created with `status: pending`, `paymentMethod: "Stripe"`
3. Immediately redirected to Stripe Checkout
4. On success, Stripe redirects to `/loader/my-bookings?bookingId=...`
5. Loader calls `POST /api/booking/verify-payment` — server queries Stripe directly and confirms the booking
6. Booking status updated to `confirmed`, receipt becomes available

### Booking Statuses
| Status | Meaning |
|--------|---------|
| `pending` | Pay At Hotel (awaiting arrival) or Stripe payment not yet completed |
| `confirmed` | Stripe payment verified — receipt available |

### My Bookings Filters
| Tab | Shows |
|-----|-------|
| All | Every booking |
| Completed | `status === "confirmed"` |
| Pending | `status === "pending"` |

---

## 📱 Pages Overview

### Public Pages
- **Home** (`/`) — hero, featured hotels, exclusive offers
- **Search** (`/search`) — advanced search with filters
- **All Rooms** (`/rooms`) — browse all rooms
- **Room Details** (`/room/:id`) — room info, availability check, payment choice
- **Experience** (`/experience`) — activities and experiences
- **About** (`/about`) — about the platform

### Protected Pages
- **Profile** (`/profile`) — stats, recent bookings, settings
- **My Bookings** (`/my-bookings`) — full booking list with filters and receipts

### Hotel Owner Pages
- **Dashboard** (`/owner`) — analytics overview
- **Add Room** (`/owner/add-room`) — add a new room
- **List Rooms** (`/owner/list-room`) — manage existing rooms

---

## 🚀 Deploying to Vercel

Both client and server are deployed as separate Vercel projects.

### Frontend
1. Import repo on Vercel, set root directory to `client`
2. Add env vars: `VITE_BACKEND_URL`, `VITE_CLERK_PUBLISHABLE_KEY`, `VITE_CURRENCY`
3. Deploy — `client/vercel.json` handles SPA routing

### Backend
1. Import same repo, set root directory to `server`
2. Add all server env vars (see above)
3. Deploy — `server/vercel.json` routes everything through `server.js`

### After Deploying
- Set `VITE_BACKEND_URL` to your server Vercel URL
- Set `FRONTEND_URL` in server env to your client Vercel URL
- Register your Stripe webhook at `https://your-server.vercel.app/api/stripe`
- Add both domains to Clerk's allowed origins
- Whitelist `0.0.0.0/0` in MongoDB Atlas (Vercel uses dynamic IPs)

---

## 🐛 Troubleshooting

**Stripe payment stays pending after checkout**
- Locally: the Stripe webhook can't reach `localhost` — this is expected. The app uses `verify-payment` on redirect instead, so it works without the webhook locally.
- In production: register the webhook at `/api/stripe` in your Stripe dashboard and set `STRIPTE_WEBHOOK_SECRET`.

**MongoDB connection error**
- Check your `MONGODB_URL` in `.env`
- Whitelist your IP (or `0.0.0.0/0`) in MongoDB Atlas

**Clerk authentication error**
- Verify your Clerk API keys
- Add your domain to allowed origins in the Clerk dashboard

**Image upload error**
- Verify Cloudinary credentials
- Check file size and format

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ using the MERN Stack**

**React** • **Node.js** • **Express** • **MongoDB** • **Tailwind CSS**
