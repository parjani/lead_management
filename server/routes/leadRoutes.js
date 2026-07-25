import express from "express";
import {
  createPublicLead
} from "../controllers/publicLeadController.js";

const router = express.Router();

router.post(
  "/create-lead",
  createPublicLead
);

export default router;