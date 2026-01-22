# 🏨 Easy Stay

A modern **full‑stack MERN** web application that simplifies hotel room booking.  
Users can explore hotels, check live room availability, and securely complete payments via **Stripe**, while administrators efficiently manage hotels, rooms, and bookings through a powerful dashboard.  
The app leverages **Clerk** for authentication and role‑based access, **Cloudinary** for seamless image uploads, and automated **email notifications** to keep users informed about confirmed bookings.

---

## 🎥 Demo
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

## 🏨 Admin Features

### Hotel & Room Management
- Each admin manages **only their own hotels**  
- Create new hotels and add rooms  
- Update or remove rooms  
- Control room availability status  
- View all rooms for the hotels they own  

### Booking Management
- Users can view their own booking history  
- Admins can:  
  - View and manage bookings for their hotels  
  - Update booking statuses  
  - Monitor room availability  

  - Monitor room availability for their hotels  

