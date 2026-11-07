
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import courseRoutes from '../routes/course.routes.js';
import noticeRoutes from '../routes/notice.routes.js';
import authRoutes from '../routes/auth.routes.js';
import uploadRoutes from '../routes/upload.routes.js';
import teacherRoutes from '../routes/teacher.routes.js';
import resultRoutes from '../routes/result.routes.js';

const app = express();

// CORS Configuration
const allowedOrigins = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    // 'https://your-frontend-domain.vercel.app'
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests without origin (Postman, server-to-server)
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
        'Content-Type',
        'Authorization'
    ]
}));

// Handle preflight requests
app.options(/.*/, cors({
    origin: allowedOrigins,
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Home Route
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to IT Backend API! 🚀',
        status: 'Server is up and running successfully',
        timestamp: new Date().toISOString()
    });
});

// API Routes
app.use('/api/v1', uploadRoutes);
app.use('/api/v1', noticeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/v1', courseRoutes);
app.use('/api/v1', teacherRoutes);
app.use('/api/v1', resultRoutes);

export default app;
