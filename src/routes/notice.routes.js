import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/upload.js"; 

import {
  createNotice,
  getPublishedNotices,
  getNoticeById,
  updatedNotice,
  deleteNotice,
} from "../controllers/notice.controller.js";

const router = Router();

// Public routes
router.get("/notices", getPublishedNotices);
router.get("/notices/:id", getNoticeById);

// Admin routes (Protected)
router.post("/admin/notices", authenticate, upload.single('image'), createNotice);
router.patch("/admin/notices/:id", authenticate, upload.single('image'), updatedNotice);
router.delete("/admin/notices/:id", authenticate, deleteNotice);

export default router;