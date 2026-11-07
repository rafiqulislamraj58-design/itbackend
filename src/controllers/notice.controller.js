import * as noticeService from "../Service/notice.service.js";
import * as imagekitService from "../Service/imagekit.service.js";
import slugify from "slugify";

export const createNotice = async (req, res) => {
  try {
    let imageUrl = "";
    if (req.file) {
      const uploadResult = await imagekitService.uploadImage(
        req.file.buffer,
        req.file.originalname
      );
      imageUrl = uploadResult.url;
    }

    const noticeData = {
      ...req.body,
      image: imageUrl,
      slug: slugify(req.body.title || "notice", { lower: true, strict: true }) + "-" + Date.now(),
    };

    const newNotice = await noticeService.createNotice(noticeData);
    res.status(201).json({
      success: true,
      data: newNotice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
      error: error.message,
    });
  }
};

export const getPublishedNotices = async (req, res) => {
  try {
    const notices = await noticeService.getPublishedNotices();
    res.status(200).json({
      success: true,
      data: notices,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getNoticeById = async (req, res) => {
  try {
    const { id } = req.params;
    const notice = await noticeService.getNoticeById(id);
    if (!notice) {
      return res.status(404).json({
        success: false,
        message: "Notice not found",
      });
    }
    res.status(200).json({
      success: true,
      data: notice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updatedNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (req.file) {
      const uploadResult = await imagekitService.uploadImage(
        req.file.buffer,
        req.file.originalname
      );
      updateData.image = uploadResult.url;
    }

    if (updateData.title) {
      updateData.slug = slugify(updateData.title, { lower: true, strict: true }) + "-" + Date.now();
    }

    const updated = await noticeService.updateNotice(id, updateData);
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Notice not found",
      });
    }
    res.status(200).json({
      success: true,
      data: updated,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNotice = await noticeService.deleteNotice(id);

    if (!deletedNotice) {
      return res.status(404).json({
        success: false,
        message: "Notice not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Notice deleted successfully",
      data: deletedNotice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};