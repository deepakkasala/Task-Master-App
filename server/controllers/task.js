const Task = require("../models/task");

const createTask = async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;
    if (!title) {
      res.status(400).json({ message: "Title required" });
    }
    const newTask = new Task({
      title,
      description,
      status,
      dueDate,
      userId: req.userId,
    });
    const savedTask = await newTask.save();
    res

      .status(201)
      .json({ message: "Task saved successfully!", savedTask, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

const getTasks = async (req, res) => {
  try {
    const userId = req.userId;
    const search = req.query.search || "";
    const status = req.query.status || "";
    const sort = req.query.sort === "desc" ? -1 : 1;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const query = {
      userId,
      $or: [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ],
    };
    if (status) {
      query.status = status;
    }
    const tasks = await Task.find(query)
      .sort({ dueDate: sort })
      .skip(skip)
      .limit(limit);
    const totalTasks = await Task.countDocuments(query);
    res.status(200).json({
      message: "Tasks fetched successfully",
      success: true,
      tasks,
      totalTasks,
      currentPage: page,
      totalPages: Math.ceil(totalTasks / limit),
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const userId = req.userId;
    const task = await Task.findOne({ _id: taskId, userId });
    if (!task) {
      res

        .status(404)
        .json({ message: "Task not found or unauthorized.", success: false });
    }
    const updates = req.body;
    const allowedFields = ["title", "description", "status", "dueDate"];
    allowedFields.forEach((field) => {
      if (updates[field] !== undefined) {
        task[field] = updates[field];
      }
    });
    const updatedTask = await task.save();
    return res.status(200).json({
      message: "Task updated successfully!",
      updatedTask,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error in updating Task" + error.message,
      success: false,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    console.log("Task Id", taskId);
    // const task = await Task.find({ _id: taskId });
    // console.log("TASK ", task);
    // if (!task) {
    // res

    // .status(404)
    // .json({ message: "Task not found or unauthorized!", success: false });
    // }
    const deletedTask = await Task.findByIdAndDelete(taskId);
    res.status(200).json({
      message: "Task deleted successfully",
      deletedTask,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error in deleting Task" + error.message,
      success: false,
    });
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
