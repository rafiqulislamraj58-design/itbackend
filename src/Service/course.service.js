import Course from '../model/Course.model.js';

export const createCourse = async (data) => {
    const newCourse = await Course.create(data);
    return newCourse;
};

export const getPublishedCourses = async () => {
    const courses = await Course.find({ status: 'published' });
    return courses;
};

export const getCourseBySlug = async (slug) => {
    const course = await Course.findOne({ slug: slug, status: 'published' });
    return course;
};

export const updateCourse = async (id, updateData) => {
    const updatedCourse = await Course.findByIdAndUpdate(id, updateData, { new: true });
    return updatedCourse;
};

export const deleteCourse = async (id) => {
    const deletedCourse = await Course.findByIdAndDelete(id);
    return deletedCourse;
};