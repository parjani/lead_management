import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getMemberDashboard } from "../controllers/memberDashboardController.js";


const router = express.Router();


router.get(
    "/",
    protect,
    getMemberDashboard
);


export default router;