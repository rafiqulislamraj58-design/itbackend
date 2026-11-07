import * as noticeService from "../Service/notice.service.js";

export const createNotice = async (req, res) => {
  try {
    const noticeData = req.body;
    const newNotice = await noticeService.createNotice(noticeData);
    res.status(201).json({
      success: true,
      data: newNotice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something  went  wrong!",
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
        message: "notice not  found",
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
    const updateData = req.body;
    const updateNotice = await noticeService.updateNotice(id, updateData);
    if (!updateNotice) {
      return res.status(404).json({
        success: false,
        message: "Notice not found",
      });
    }
    res.status(200).json({
      success: true,
      data: updateNotice,
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