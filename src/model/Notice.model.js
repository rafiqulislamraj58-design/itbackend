import mongoose from 'mongoose';

const noticeShema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },slug:{
        type: String,
        required: true,
        unique: true,
    },
    status:{
        type: String,
        enum:['draft','published'],
        default:'draft'
    }
    
},{
    timestamps:true
})
const Notice = mongoose.model('Notice',noticeShema);
export default Notice; 