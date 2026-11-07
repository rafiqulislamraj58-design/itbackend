import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    descriptions: { type: String, required: true },
    duration: { type: String, required: true },
    curriculum: { type: String, required: true }, 
    fee: { type: Number, required: true },
    banner: { type: String }, 
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft'
    }
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);
export default Course;