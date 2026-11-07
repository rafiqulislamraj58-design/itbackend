import { Router } from 'express'
import * as uploadController from '../controllers/upload.controller.js';
import { upload } from '../middlewares/upload.js'
const router = Router();

router.post(
    '/admin/uploads/image',
    upload.single('image'),
    uploadController.uploadImage
);

export default router;