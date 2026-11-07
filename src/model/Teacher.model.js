import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
    name: { type: String, required: true },
    designation: { type: String, required: true }, 
    department: { type: String, required: true }, 
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    image: { type: String }, 
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    }
}, { timestamps: true });

const Teacher = mongoose.model('Teacher', teacherSchema);
export default Teacher;