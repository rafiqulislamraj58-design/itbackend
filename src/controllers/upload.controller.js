import * as imagekitService from '../Service/imagekit.service.js';

export const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No image file provided"
            });
        }

        const result = await imagekitService.uploadImage(
            req.file.buffer,
            req.file.originalname
        );

        res.status(201).json({
            success: true,
            data: {
                url: result.url,
                fileId: result.fileId
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};