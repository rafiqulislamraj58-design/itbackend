import { Router } from "express";

import { authenticate } from "../middlewares/auth.middleware.js";

import {
  createResult,
  getResults,
  getSingleResult,
  updateResult,
  deleteResult,
  getAnalytics,
  getOverallSummary,
} from "../controllers/result.controller.js";

const router = Router();

// Public routes
router.get("/results/analytics", getAnalytics);
router.get("/results/summary", getOverallSummary);
router.get("/results", getResults);
router.get("/results/:id", getSingleResult);

// Admin routes (authentication required)
router.post("/admin/results", authenticate, createResult);
router.patch("/admin/results/:id", authenticate, updateResult);
router.delete("/admin/results/:id", authenticate, deleteResult);

export default router;