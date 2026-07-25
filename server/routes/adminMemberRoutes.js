import express from "express";
import {
  getAllMembers,
  getMemberById,
  createMember,
  updateMember,
  deleteMember,
} from "../controllers/adminMemberController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", protect, authorize("admin"), getAllMembers);

router.get("/:id", protect, authorize("admin"), getMemberById);

router.post("/", protect, authorize("admin"), createMember);

router.put("/:id", protect, authorize("admin"), updateMember);

router.delete("/:id", protect, authorize("admin"), deleteMember);

export default router;