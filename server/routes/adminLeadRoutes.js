import express from "express";
import { addNote, createLead, deleteLead, getAllLeads, getLeadById, updateLead } from "../controllers/adminLeadController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", protect, authorize("admin"), getAllLeads);

router.get("/:id", protect, authorize("admin"), getLeadById);

router.post("/", protect, authorize("admin"), createLead);

router.put("/:id", protect, authorize("admin"), updateLead);

router.delete("/:id", protect, authorize("admin"), deleteLead);

router.post("/:id/notes", protect, authorize("admin"), addNote);

export default router;