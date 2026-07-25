import express from "express";

import {
    getMemberActivities,
    getMemberActivityStats
} from "../controllers/memberActivityController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get(
    "/",
    protect,
    authorize("member"),
    getMemberActivities
);

    

router.get(
    "/stats",
    protect,
    authorize("member"),
    getMemberActivityStats
);

export default router;