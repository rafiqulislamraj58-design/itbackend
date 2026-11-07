import mongoose from 'mongoose';

import config from './config.js'

export const connectToDb = async()=>{
    mongoose.connect(config.MONGO_URI);
    console.log('connted to  db')
}