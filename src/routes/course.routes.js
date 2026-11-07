import { Router } from 'express';
import * as courseController from '../controllers/course.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/upload.js'; 

const router = Router();


router.get('/courses', courseController.getPublishedCourses);
router.get('/courses/:slug', courseController.getCourseBySlug);

router.post(
    '/admin/courses', 
    authenticate, 
    upload.single('banner'), 
    courseController.createCourse
);

router.patch(
    '/admin/courses/:id', 
    authenticate, 
    upload.single('banner'), 
    courseController.updateCourse
);

router.delete(
    '/admin/courses/:id', 
    authenticate, 
    courseController.deleteCourse
);

export default router;