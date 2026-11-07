import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import * as teacherController from '../controllers/teacher.controller.js';
import { upload } from '../middlewares/upload.js'; 

const router = Router();

// Public route
router.get('/teachers', teacherController.getAllTeachers);

// Admin route (Protected)
router.post('/admin/teachers', authenticate, upload.single('image'), teacherController.addTeacher);

export default router;