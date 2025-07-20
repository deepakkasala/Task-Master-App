const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required."],
      min: [3, "Title must be atleast three characters"],
      max: [50, "Title can't exceed 50 characters"],
    },
    description: {
      type: String,
      min: [3, "Title must be atleast three characters"],
      max: [500, "Title can't exceed 50 characters"],
      default: "",
    },
    status: {
      type: String,
      enum: ["todo", "in progress", "done"],
      default: "todo",
    },
    dueDate: {
      type: Date,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("task", taskSchema);

module.exports = Task;
