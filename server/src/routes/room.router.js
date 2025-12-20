import { Router } from "express";
import isAuth from "../middleware/authMiddleware.js";
import { createRoom, getAllRooms, getOwnerRooms, toggleAvailability } from "../controllers/room.controller.js";
import upload from "../middleware/uploadMiddleware.js";
const router = Router();

// create new room
router.post('/create-room', upload.array("images", 4), isAuth, createRoom);
// get all rooms 
router.get('/', getAllRooms);
// get hotel/owner rooms 
router.get('/owner-rooms', isAuth, getOwnerRooms);
// toggle availability room 
router.post('/toggle-availability', isAuth, toggleAvailability);




export default router;