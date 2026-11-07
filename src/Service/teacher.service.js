import Teacher from '../model/Teacher.model.js';

export const addTeacher = async (data) => {
    return await Teacher.create(data);
};

export const getAllTeachers = async () => {
    return await Teacher.find({ status: 'active' });
};

export const getTeacherById = async (id) => {
    return await Teacher.findById(id);
};

export const updateTeacher = async (id, updateData) => {
    return await Teacher.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteTeacher = async (id) => {
    return await Teacher.findByIdAndDelete(id);
};