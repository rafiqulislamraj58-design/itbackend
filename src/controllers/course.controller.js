import * as courseService from '../Service/course.service.js';
import * as imagekitService from '../Service/imagekit.service.js'; 

export const createCourse = async (req, res) => {
    try {
        const courseData = req.body; 
        if (req.file) {
            const result = await imagekitService.uploadImage(req.file.buffer, req.file.originalname);
           
            courseData.banner = result.url; 
        }

        const newCourse = await courseService.createCourse(courseData);
        res.status(201).json({ success: true, data: newCourse });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};





export const getPublishedCourses = async (req, res) => {
    try {
        const courses = await courseService.getPublishedCourses();
        res.status(200).json({ success: true, data: courses });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getCourseBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const course = await courseService.getCourseBySlug(slug);
        
        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found!" });
        }
        res.status(200).json({ success: true, data: course });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updatedCourse = await courseService.updateCourse(id, updateData);
        
        if (!updatedCourse) {
            return res.status(404).json({ success: false, message: "Course not found to update!" });
        }
        res.status(200).json({ success: true, data: updatedCourse });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCourse = await courseService.deleteCourse(id);
        
        if (!deletedCourse) {
            return res.status(404).json({ success: false, message: "Course not found to delete!" });
        }
        res.status(200).json({ success: true, message: "Course deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};