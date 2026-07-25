import express from "express";
import {
  loginUser,
  logoutUser,
  getCurrentUser,
  changePassword,
  updateProfile,
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public Route
router.post("/login", loginUser);

// Protected Routes
router.post("/logout", protect, logoutUser);

router.get("/me", protect, getCurrentUser);

router.put("/change-password", protect, changePassword);

router.put(
    "/profile",
    protect,
    updateProfile
);



export default router;