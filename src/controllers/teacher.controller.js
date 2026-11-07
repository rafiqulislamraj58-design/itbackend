
import * as teacherService from '../Service/teacher.service.js';
import * as imagekitService from '../Service/imagekit.service.js';

// CREATE TEACHER
export const addTeacher = async (req, res) => {
    try {
        const teacherData = { ...req.body };

        if (req.file) {
            const result = await imagekitService.uploadImage(
                req.file.buffer,
                req.file.originalname
            );
            teacherData.image = result.url;
        }

        const newTeacher = await teacherService.addTeacher(teacherData);

        res.status(201).json({
            success: true,
            message: 'Teacher created successfully',
            data: newTeacher
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// GET ALL TEACHERS
export const getAllTeachers = async (req, res) => {
    try {
        const teachers = await teacherService.getAllTeachers();

        res.status(200).json({
            success: true,
            count: teachers.length,
            data: teachers
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// GET SINGLE TEACHER
export const getTeacherById = async (req, res) => {
    try {
        const teacher = await teacherService.getTeacherById(req.params.id);

        if (!teacher) {
            return res.status(404).json({
                success: false,
                message: 'Teacher not found'
            });
        }

        res.status(200).json({
            success: true,
            data: teacher
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// UPDATE TEACHER
export const updateTeacher = async (req, res) => {
    try {
        const teacherData = { ...req.body };

        if (req.file) {
            const result = await imagekitService.uploadImage(
                req.file.buffer,
                req.file.originalname
            );

            teacherData.image = result.url;
        }

        const updatedTeacher = await teacherService.updateTeacher(
            req.params.id,
            teacherData
        );

        if (!updatedTeacher) {
            return res.status(404).json({
                success: false,
                message: 'Teacher not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Teacher updated successfully',
            data: updatedTeacher
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// DELETE TEACHER
export const deleteTeacher = async (req, res) => {
    try {
        const deletedTeacher = await teacherService.deleteTeacher(req.params.id);

        if (!deletedTeacher) {
            return res.status(404).json({
                success: false,
                message: 'Teacher not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Teacher deleted successfully',
            data: deletedTeacher
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
