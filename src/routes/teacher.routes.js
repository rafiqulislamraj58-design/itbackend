
import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import * as teacherController from '../controllers/teacher.controller.js';
import { upload } from '../middlewares/upload.js';

const router = Router();

// PUBLIC ROUTES
router.get('/teachers', teacherController.getAllTeachers);
router.get('/teachers/:id', teacherController.getTeacherById);

// ADMIN ROUTES (PROTECTED)
router.post(
    '/admin/teachers',
    authenticate,
    upload.single('image'),
    teacherController.addTeacher
);

router.put(
    '/admin/teachers/:id',
    authenticate,
    upload.single('image'),
    teacherController.updateTeacher
);

router.delete(
    '/admin/teachers/:id',
    authenticate,
    teacherController.deleteTeacher
);

export default router;
