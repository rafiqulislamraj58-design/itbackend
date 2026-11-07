import * as teacherService from '../Service/teacher.service.js';
import * as imagekitService from '../Service/imagekit.service.js';

export const addTeacher = async (req, res) => {
    try {
        const teacherData = req.body;

        
        if (req.file) {
            const result = await imagekitService.uploadImage(req.file.buffer, req.file.originalname);
            teacherData.image = result.url; 
        }

        const newTeacher = await teacherService.addTeacher(teacherData);
        res.status(201).json({ success: true, data: newTeacher });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getAllTeachers = async (req, res) => {
    try {
        const teachers = await teacherService.getAllTeachers();
        res.status(200).json({ success: true, data: teachers });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

