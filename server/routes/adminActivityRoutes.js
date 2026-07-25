import express from "express";



import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import { getAllActivities } from "../controllers/adminActivityController.js";


const router = express.Router();



router.get(
    "/",
    protect,
    authorize("admin"),
    getAllActivities
);



export default router;