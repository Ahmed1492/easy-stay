import { Router } from "express";
import { getRecentSearch, getUserData, getUserProfile, storeUserSearchCities } from "../controllers/user.controller.js";
import isAuth from "../middleware/authMiddleware.js";
const router = Router();

// get user data
router.get('/', isAuth, getUserData);

// get user profile stats + recent bookings
router.get('/profile', isAuth, getUserProfile);

// store recent searched cities
router.post('/store-recent-search', isAuth, storeUserSearchCities);

router.get('/recent-search', isAuth, getRecentSearch);

export default router;