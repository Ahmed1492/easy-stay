import { Router } from "express";
import isAuth from "../middleware/authMiddleware.js";
import { registerHotel } from "../controllers/hotel.controller.js";
const router = Router();

// create new hotel
router.post('/register', isAuth,registerHotel);




export default router;