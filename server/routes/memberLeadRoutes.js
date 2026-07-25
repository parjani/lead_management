import express from "express";
import {
  getMemberLeads,
  getMemberLeadById,
  updateMemberLeadStatus,
  addLeadNote,
} from "../controllers/memberLeadController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";


const router = express.Router();


router.get("/", protect, authorize("member"), getMemberLeads);
router.get("/leads/:id", protect, authorize("member"), getMemberLeadById);
router.put(
    "/:id/status",
    protect, authorize("member"),
    updateMemberLeadStatus
);
router.post("/leads/:id/notes", protect, authorize("member"), addLeadNote);

export default router;