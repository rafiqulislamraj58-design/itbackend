
import mongoose from 'mongoose';
import Teacher from '../model/Teacher.model.js';

// CREATE TEACHER
export const addTeacher = async (data) => {
    if (!data || Object.keys(data).length === 0) {
        throw new Error('Teacher data is required');
    }

    return await Teacher.create(data);
};

// GET ALL ACTIVE TEACHERS
export const getAllTeachers = async () => {
    return await Teacher.find({ status: 'active' })
        .sort({ createdAt: -1 })
        .lean();
};

// GET SINGLE TEACHER
export const getTeacherById = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid teacher ID');
    }

    return await Teacher.findById(id).lean();
};

// UPDATE TEACHER
export const updateTeacher = async (id, updateData) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid teacher ID');
    }

    if (!updateData || Object.keys(updateData).length === 0) {
        throw new Error('Update data is required');
    }

    return await Teacher.findByIdAndUpdate(
        id,
        { $set: updateData },
        {
            new: true,
            runValidators: true
        }
    );
};

// DELETE TEACHER
export const deleteTeacher = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid teacher ID');
    }

    return await Teacher.findByIdAndDelete(id);
};
