import { Router } from "express";
import isAuth from "../middleware/authMiddleware.js";
import { checkAvailabilityApi, createBooking, getHotelBookins, userBookings } from "../controllers/booking.controller.js";

const router = Router();

// check booking availability
router.post('/check-availability', checkAvailabilityApi);

// create new booking
router.post('/create', isAuth, createBooking);

// get user bookings
router.get('/user-bookings', isAuth, userBookings);


// booking detail for specefic getHotel Bookins
router.get('/hotel-bookings', isAuth, getHotelBookins);



export default router;