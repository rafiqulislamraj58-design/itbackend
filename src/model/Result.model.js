import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true,
      trim: true,
    },

    rollNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },

    courseCategory: {
      type: String,
      required: true,
      enum: [
        "Web Development",
        "Graphic Design",
        "Digital Marketing",
      ],
    },

    passingYear: {
      type: Number,
      required: true,
      min: 2000,
      max: new Date().getFullYear(),
    },

    marks: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    grade: {
      type: String,
      required: true,
      enum: ["A+", "A", "A-", "B", "C", "D", "F"],
    },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
    },
  },
  {
    timestamps: true,
  }
);

const Result = mongoose.model("Result", resultSchema);

export default Result;