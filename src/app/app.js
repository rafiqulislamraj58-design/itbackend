import express from 'express';
import cookieParser from 'cookie-parser';
import courseRoutes from '../routes/course.routes.js';

import noticeRoutes from '../routes/notice.routes.js';
import authRoutes from '../routes/auth.routes.js';
import uploadRoutes from '../routes/upload.routes.js';import teacherRoutes from '../routes/teacher.routes.js';
import resultRoutes from "../routes/result.routes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to IT Backend API! 🚀',
        status: 'Server is up and running successfully',
        timestamp: new Date().toISOString()
    });
});
app.use('/api/v1', uploadRoutes);
app.use('/api/v1', noticeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/v1', courseRoutes);
app.use('/api/v1', teacherRoutes);
app.use("/api/v1", resultRoutes);
export default app;