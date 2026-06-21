import { Router } from "express";
import isAuth from "../middleware/authMiddleware.js";
import { checkAvailabilityApi, createBooking, getHotelBookins, striptePayment, userBookings, verifyStripePayment } from "../controllers/booking.controller.js";

const router = Router();

// check booking availability
router.post('/check-availability', isAuth, checkAvailabilityApi);

// create new booking
router.post('/create', isAuth, createBooking);

// get user bookings
router.get('/user-bookings', isAuth, userBookings);

// booking detail for specefic getHotel Bookins
router.get('/hotel-bookings', isAuth, getHotelBookins);

router.post('/stripe-payment', isAuth, striptePayment);

// verify stripe payment on return from checkout (works locally without webhook)
router.post('/verify-payment', isAuth, verifyStripePayment);

export default router;