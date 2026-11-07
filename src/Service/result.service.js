
import Result from "../model/Result.model.js";
import { calculateGrade } from "../utils/calculateGrade.js";

export const createResult = async (data) => {
  const grade = calculateGrade(data.marks);

  return await Result.create({
    ...data,
    grade,
  });
};

export const getResults = async () => {
  return await Result.find({
    status: "published",
  }).sort({ passingYear: -1 });
};

export const getSingleResult = async (id) => {
  return await Result.findOne({
    _id: id,
    status: "published",
  });
};

export const updateResult = async (id, data) => {
  const updateData = { ...data };

  if (data.marks !== undefined) {
    updateData.grade = calculateGrade(data.marks);
  }

  return await Result.findByIdAndUpdate(
    id,
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );
};

export const deleteResult = async (id) => {
  return await Result.findByIdAndDelete(id);
};

export const getAnalyticsData = async (filters = {}) => {
  const matchStage = {
    status: "published",
  };

  if (filters.year) {
    matchStage.passingYear = Number(filters.year);
  }

  if (filters.course) {
    matchStage.courseCategory = filters.course;
  }

  return await Result.aggregate([
    {
      $match: matchStage,
    },
    {
      $group: {
        _id: {
          year: "$passingYear",
          course: "$courseCategory",
        },

        totalStudents: {
          $sum: 1,
        },

        totalAplus: {
          $sum: {
            $cond: [
              { $eq: ["$grade", "A+"] },
              1,
              0,
            ],
          },
        },

        passedStudents: {
          $sum: {
            $cond: [
              { $ne: ["$grade", "F"] },
              1,
              0,
            ],
          },
        },

        failedStudents: {
          $sum: {
            $cond: [
              { $eq: ["$grade", "F"] },
              1,
              0,
            ],
          },
        },

        averageMarks: {
          $avg: "$marks",
        },
      },
    },
    {
      $project: {
        _id: 0,
        year: "$_id.year",
        course: "$_id.course",
        totalStudents: 1,
        totalAplus: 1,
        passedStudents: 1,
        failedStudents: 1,

        averageMarks: {
          $round: ["$averageMarks", 2],
        },

        passRate: {
          $round: [
            {
              $multiply: [
                {
                  $divide: [
                    "$passedStudents",
                    "$totalStudents",
                  ],
                },
                100,
              ],
            },
            2,
          ],
        },

        failRate: {
          $round: [
            {
              $multiply: [
                {
                  $divide: [
                    "$failedStudents",
                    "$totalStudents",
                  ],
                },
                100,
              ],
            },
            2,
          ],
        },
      },
    },
    {
      $sort: {
        year: -1,
        course: 1,
      },
    },
  ]);
};
export const getOverallSummary = async () => {
  const result = await Result.aggregate([
    {
      $match: {
        status: "published",
      },
    },
    {
      $group: {
        _id: null,
        totalStudents: { $sum: 1 },

        totalAplus: {
          $sum: {
            $cond: [{ $eq: ["$grade", "A+"] }, 1, 0],
          },
        },

        passedStudents: {
          $sum: {
            $cond: [{ $ne: ["$grade", "F"] }, 1, 0],
          },
        },

        failedStudents: {
          $sum: {
            $cond: [{ $eq: ["$grade", "F"] }, 1, 0],
          },
        },

        averageMarks: { $avg: "$marks" },
      },
    },
    {
      $project: {
        _id: 0,
        totalStudents: 1,
        totalAplus: 1,
        passedStudents: 1,
        failedStudents: 1,
        averageMarks: { $round: ["$averageMarks", 2] },

        passRate: {
          $round: [
            {
              $multiply: [
                { $divide: ["$passedStudents", "$totalStudents"] },
                100,
              ],
            },
            2,
          ],
        },

        failRate: {
          $round: [
            {
              $multiply: [
                { $divide: ["$failedStudents", "$totalStudents"] },
                100,
              ],
            },
            2,
          ],
        },
      },
    },
  ]);

  return result[0] || {
    totalStudents: 0,
    totalAplus: 0,
    passedStudents: 0,
    failedStudents: 0,
    averageMarks: 0,
    passRate: 0,
    failRate: 0,
  };
};