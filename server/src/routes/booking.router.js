import { Router } from "express";
import isAuth from "../middleware/authMiddleware.js";
import { checkAvailabilityApi, createBooking } from "../controllers/booking.controller.js";

const router = Router();

// check booking availability
router.post('/check-availability', checkAvailabilityApi);

// check booking availability
router.post('/create', createBooking);




export default router;