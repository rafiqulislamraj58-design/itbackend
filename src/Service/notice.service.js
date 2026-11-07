import Notice from "../model/Notice.model.js";

export const createNotice = async (data) => {
  return await Notice.create(data);
};

export const getPublishedNotices = async () => {
  return await Notice.find({ status: "published" });
};

export const getNoticeById = async (id) => {
  return await Notice.findById(id);
};

export const updateNotice = async (id, updateData) => {
  return await Notice.findByIdAndUpdate(
    id,
    updateData,
    { new: true, runValidators: true }
  );
};

export const deleteNotice = async (id) => {
  return await Notice.findByIdAndDelete(id);
};