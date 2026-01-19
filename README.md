# 🏨 Easy Stay

A modern **full‑stack MERN** web application that simplifies hotel room booking.  
Users can explore hotels, check live room availability, and securely complete payments via **Stripe**, while administrators efficiently manage hotels, rooms, and bookings through a powerful dashboard.  
The app leverages **Clerk** for authentication and role‑based access, **Cloudinary** for seamless image uploads, and automated **email notifications** to keep users informed about confirmed bookings.

---

## 📖 Project Overview
- **For Users:** Browse hotels, check room availability by date, book rooms, and pay securely.  
- **For Admins:** Create hotels, add/manage rooms, update availability, and oversee bookings.  
- **Core Integrations:** Stripe (payments), Clerk (authentication), Cloudinary (image uploads), Nodemailer (email notifications).  

---

## 🛠️ Technologies Used

### Frontend
- React + Vite  
- Tailwind CSS  
- Clerk React  
- Axios  
- React Hot Toast  

### Backend
- Node.js + Express  
- MongoDB with Mongoose  
- Clerk  
- Stripe API  
- Cloudinary  
- Nodemailer  
- Multer  
- Svix  
- CORS  
- Dotenv  
- Nodemon  

---

## 🎥 Demo
[Demo link here]  

---

## 👤 User Features

### 🔑 Account Management
- Register or log in via **Clerk**  
- Access protected routes with authentication  
- Retrieve personal account details  

### 🖼️ Profile Management
- View personal information and booking history  

### 🔒 Secure Access
- Middleware ensures only authenticated users access protected features  

---

## 🛒 Booking & Room Features
- Browse hotels and rooms  
- Check availability by check‑in and check‑out dates  
- Book rooms and pay securely with **Stripe**  
- Receive email confirmation with booking details  

---

## 💳 Checkout & Payments
- Integrated **Stripe** checkout for secure payments  
- Automatic order verification after successful payment  
- Supports test/dummy cards for development  

---

## 🏨 Hotel & Room Management (Admin)
- Create new hotels and add rooms  
- Update or remove rooms  
- Control room availability status  
- View all rooms for each hotel  

---

## 📦 Booking Management
- **Users:** View personal booking history  
- **Admins:**  
  - View all bookings for their hotels  
  - Update booking statuses  
  - Monitor room availability  

---
