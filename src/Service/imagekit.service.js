import { imagekit } from '../config/config.js';

export const uploadImage = async (fileBuffer, fileName) => {
    const response = await imagekit.upload({
        file: fileBuffer,
        fileName,
        folder: '/it_institute_management'
    });

    return response;
};