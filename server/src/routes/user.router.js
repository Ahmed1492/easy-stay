import { Router } from "express";
import { getUserData, storeUserSearchCities } from "../controllers/user.controller.js";
import isAuth from "../middleware/authMiddleware.js";
const router = Router();

// get user data
router.get('/', isAuth, getUserData);

// store recent searched cities
router.post('/store-recent-cities', isAuth, storeUserSearchCities);





export default router;