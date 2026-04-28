# QuickStay Client - Frontend Application

A modern, responsive hotel booking platform built with React, Vite, and Tailwind CSS.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Pages & Routes](#pages--routes)
- [Components](#components)
- [State Management](#state-management)
- [Styling](#styling)
- [Running the Application](#running-the-application)
- [Building for Production](#building-for-production)

## ✨ Features

### User Features
- 🔐 **Authentication**: Secure login/signup with Clerk
- 🔍 **Advanced Search**: Search hotels by destination, dates, and guests
- 🏨 **Hotel Browsing**: Grid and list view options
- 📋 **Booking Management**: View and manage all bookings
- ❤️ **Favorites**: Save favorite hotels
- 👤 **User Profile**: Comprehensive profile with stats and history
- 💳 **Secure Payments**: Stripe integration for payments
- 📱 **Responsive Design**: Works on all devices

### Hotel Owner Features
- 🏢 **Hotel Registration**: Register and manage hotels
- 🛏️ **Room Management**: Add, edit, and delete rooms
- 📊 **Dashboard**: View bookings and revenue analytics
- 📈 **Statistics**: Track performance metrics

### UI/UX Features
- 🎨 **Modern Design**: Clean, professional interface
- ⚡ **Fast Performance**: Optimized with Vite
- 🌙 **Smooth Animations**: Engaging user experience
- 🎯 **Intuitive Navigation**: Easy to use interface
- 📸 **Image Galleries**: Beautiful room showcases
- 🔔 **Toast Notifications**: Real-time feedback
- 💀 **Skeleton Loaders**: Better loading states

## 🛠 Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM v6
- **Authentication**: Clerk React
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast
- **Icons & Images**: Custom SVG assets
- **Fonts**: Google Fonts (Outfit, Playfair, Roboto)

## 📦 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend server running (see server README)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Create a `.env` file in the client root
   - Add required variables (see below)

4. **Start development server**
   ```bash
   npm run dev
   ```

## 🔐 Environment Variables

Create a `.env` file in the client directory:

```env
# Backend API URL
VITE_BACKEND_URL=http://localhost:5000

# Clerk Authentication
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

# Currency Symbol
VITE_CURRENCY=$

# App Configuration
VITE_APP_NAME=QuickStay
VITE_APP_URL=http://localhost:5173
```

### Getting API Keys:

1. **Clerk Publishable Key**:
   - Go to [clerk.com](https://clerk.com)
   - Create/select your application
   - Copy the publishable key from dashboard

2. **Backend URL**:
   - Use `http://localhost:5000` for local development
   - Update with production URL when deploying

## 📁 Project Structure

```
client/
├── public/
│   ├── favicon.svg
│   └── logo1.png
├── src/
│   ├── assets/
│   │   ├── assets.js              # Asset exports
│   │   ├── *.svg                  # SVG icons
│   │   └── *.png                  # Images
│   ├── components/
│   │   ├── Navbar.jsx             # Navigation bar
│   │   ├── Footer.jsx             # Footer component
│   │   ├── Hero.jsx               # Hero section
│   │   ├── HotelCard.jsx          # Hotel card component
│   │   ├── HotelRoomCard.jsx      # Room card (horizontal)
│   │   ├── SearchRoomCard.jsx     # Room card (vertical)
│   │   ├── RoomQuickViewModal.jsx # Quick view popup
│   │   ├── OffersCard.jsx         # Exclusive offers card
│   │   ├── ExclusiveOffers.jsx    # Offers section
│   │   ├── FiltersHotelRooms.jsx  # Filter sidebar
│   │   ├── HetelRooms.jsx         # Rooms list
│   │   ├── HotelBookingForm.jsx   # Search form
│   │   ├── RoomCheckAvailabiltiy.jsx # Booking form
│   │   ├── SkeletonLoader.jsx     # Loading skeletons
│   │   ├── ScrollToTop.jsx        # Scroll utility
│   │   ├── Loader.jsx             # Loading spinner
│   │   └── hotelOwner/
│   │       ├── SideNav.jsx        # Owner sidebar
│   │       ├── AddRoomDetails.jsx # Add room form
│   │       ├── AllRoomsTable.jsx  # Rooms table
│   │       └── RecentBookingTable.jsx # Bookings table
│   ├── context/
│   │   └── AppContext.jsx         # Global state
│   ├── pages/
│   │   ├── Home.jsx               # Homepage
│   │   ├── Search.jsx             # Search page
│   │   ├── AllRooms.jsx           # Rooms listing
│   │   ├── Room.jsx               # Room details
│   │   ├── MyBookings.jsx         # User bookings
│   │   ├── Profile.jsx            # User profile
│   │   ├── Experience.jsx         # Experiences page
│   │   ├── About.jsx              # About page
│   │   └── hotelOwner/
│   │       ├── Layout.jsx         # Owner layout
│   │       ├── Dashboard.jsx      # Owner dashboard
│   │       ├── AddRoom.jsx        # Add room page
│   │       └── ListRoom.jsx       # List rooms page
│   ├── App.jsx                    # Main app component
│   ├── main.jsx                   # Entry point
│   └── index.css                  # Global styles
├── .env                           # Environment variables
├── .gitignore
├── eslint.config.js               # ESLint configuration
├── index.html                     # HTML template
├── package.json
├── postcss.config.mjs             # PostCSS config
├── tailwind.config.js             # Tailwind config
├── vite.config.js                 # Vite configuration
├── vercel.json                    # Vercel deployment
└── README.md
```

## 🗺 Pages & Routes

### Public Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Home | Homepage with hero and featured hotels |
| `/search` | Search | Advanced search with filters |
| `/rooms` | AllRooms | All available rooms |
| `/room/:id` | Room | Room details and booking |
| `/experience` | Experience | Experiences and activities |
| `/about` | About | About the platform |

### Protected Routes (Require Login)

| Route | Component | Description |
|-------|-----------|-------------|
| `/profile` | Profile | User profile and stats |
| `/my-bookings` | MyBookings | User's booking history |

### Hotel Owner Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/owner` | Dashboard | Owner dashboard |
| `/owner/add-room` | AddRoom | Add new room |
| `/owner/list-room` | ListRoom | Manage rooms |

## 🧩 Components

### Core Components

**Navbar**
- Responsive navigation
- User authentication menu
- Mobile menu
- Profile and bookings links

**Hero**
- Eye-catching hero section
- Search form integration
- Animated statistics
- Call-to-action buttons

**HotelCard**
- Hotel information display
- Quick view functionality
- Favorite button
- Responsive design

**SearchRoomCard** (Vertical)
- Compact card for grid view
- Image with badges
- Amenities list
- Quick view on click

**HotelRoomCard** (Horizontal)
- Detailed room information
- Large image gallery
- Amenities display
- Booking button

**RoomQuickViewModal**
- Popup room details
- Image carousel
- Amenities showcase
- Direct booking link

**SkeletonLoader**
- Multiple variants (card, room, hero, grid)
- Shimmer animation
- Better loading UX

### Filter Components

**FiltersHotelRooms**
- Price range slider
- Room type checkboxes
- Amenities filter
- Sort options
- Clear filters button

### Booking Components

**HotelBookingForm**
- Destination search
- Date picker
- Guest selector
- Recent searches

**RoomCheckAvailability**
- Date selection
- Guest count
- Availability check
- Booking confirmation

### Owner Components

**SideNav**
- Dashboard navigation
- Active route highlighting
- Logout functionality

**AddRoomDetails**
- Room information form
- Image upload
- Amenities selection
- Price configuration

**AllRoomsTable**
- Rooms list table
- Edit/Delete actions
- Status indicators

**RecentBookingTable**
- Recent bookings display
- Status management
- Guest information

## 🎨 Styling

### Tailwind CSS Configuration

**Custom Colors**
```javascript
colors: {
  primary: '#2563eb',
  secondary: '#fbbf24',
}
```

**Custom Fonts**
- **Outfit**: Primary font
- **Playfair**: Headings and titles
- **Roboto**: Alternative text

### Custom Animations

```css
/* Fade In */
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Slide Up */
@keyframes slide-up {
  from { 
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Scale In */
@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

### Custom Scrollbar

```css
::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #1f2937 0%, #111827 100%);
  border-radius: 10px;
}
```

## 🔄 State Management

### AppContext

Global state managed with React Context API:

```javascript
{
  currency: "$",
  backEndUrl: "http://localhost:5000",
  user: {...},              // Clerk user object
  isOwner: false,           // User role
  rooms: [...],             // All rooms
  searchCities: [...],      // Recent searches
  showHotelReg: false,      // Hotel registration modal
}
```

### Context Methods

- `fetchUser()`: Get user data
- `fetchRooms()`: Get all rooms
- `navigate()`: Programmatic navigation
- `getToken()`: Get auth token

## 🏃 Running the Application

### Development Mode
```bash
npm run dev
```
Access at: `http://localhost:5173`

### Preview Production Build
```bash
npm run build
npm run preview
```

### Lint Code
```bash
npm run lint
```

## 📦 Building for Production

### Build Command
```bash
npm run build
```

Output directory: `dist/`

### Environment Variables for Production

Update `.env` with production values:
```env
VITE_BACKEND_URL=https://your-api.vercel.app
VITE_APP_URL=https://your-domain.vercel.app
```

### Deploying to Vercel

1. Push your repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → import repo
3. Set **Root Directory** to `client`
4. Add environment variables in the Vercel dashboard:
   - `VITE_BACKEND_URL` → your deployed server URL
   - `VITE_CLERK_PUBLISHABLE_KEY` → your Clerk publishable key
   - `VITE_CURRENCY` → `$`
5. Click **Deploy** — Vercel auto-detects Vite

The `vercel.json` in this folder rewrites all routes to `index.html` for SPA routing.

> **Note:** The build script runs `vite build` directly — lint warnings will not block the build.

## 🎯 Key Features Implementation

### Search Functionality
- Real-time search with filters
- Date range selection
- Guest count
- Price range slider
- Room type filtering
- Amenities filtering

### Booking Flow
1. Search for hotels
2. View room details
3. Check availability
4. Enter booking details
5. Proceed to payment
6. Confirmation

### View Modes
- **Grid View**: Vertical cards (3 columns)
- **List View**: Horizontal cards (full width)
- Toggle between views

### Authentication Flow
1. Click Login/Signup
2. Clerk modal opens
3. User authenticates
4. Redirected to profile/dashboard
5. Token stored automatically

## 🐛 Troubleshooting

### Common Issues

**Vite not starting**
```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
```

**Clerk authentication error**
- Verify `VITE_CLERK_PUBLISHABLE_KEY`
- Check Clerk dashboard settings
- Ensure correct domain in Clerk

**API connection error**
- Verify backend is running
- Check `VITE_BACKEND_URL`
- Check CORS settings on backend

**Images not loading**
- Check Cloudinary configuration
- Verify image URLs in database
- Check network tab for errors

**Build errors**
```bash
# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

## 📱 Responsive Breakpoints

```javascript
sm: '640px'   // Small devices
md: '768px'   // Medium devices
lg: '1024px'  // Large devices
xl: '1280px'  // Extra large devices
2xl: '1536px' // 2X Extra large
```

## ⚡ Performance Optimization

- **Code Splitting**: Automatic with Vite
- **Lazy Loading**: Images load on demand
- **Skeleton Loaders**: Better perceived performance
- **Optimized Images**: Cloudinary transformations
- **Minification**: Automatic in production build
- **Tree Shaking**: Unused code removed

## 🔒 Security Best Practices

- Environment variables for sensitive data
- Clerk for secure authentication
- HTTPS in production
- Input validation
- XSS protection
- CSRF tokens for forms

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [Clerk Documentation](https://clerk.com/docs)

## 🎨 Design System

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

### Spacing Scale
- xs: 0.5rem (8px)
- sm: 0.75rem (12px)
- md: 1rem (16px)
- lg: 1.5rem (24px)
- xl: 2rem (32px)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👥 Support

For support:
- Email: support@quickstay.com
- Documentation: [docs.quickstay.com](https://docs.quickstay.com)
- Issues: GitHub Issues

---

**Built with ❤️ using React + Vite + Tailwind CSS**
