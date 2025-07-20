const Task = require("../models/task");

const User = require("../models/user");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).select("-password");
    res

      .status(200)
      .json({ message: "Users fetched successfully by Admin.", users });
  } catch (error) {
    res

      .status(500)
      .json({ message: "Error in fetching all the users by Admin." });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log(userId);
    const user = await User.find({ _id: userId }).select("-password");
    console.log(user);
    if (user) {
      res.status(200).json({ user });
    }
    res.status(404).json({ message: "User not found." });
  } catch (error) {
    res

      .status(500)
      .json({ message: "Error in fetching user details by Admin." });
  }
};

const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    console.log(role);
    const id = req.params.id;
    if (!role || !["user", "admin"].includes(role)) {
      res.status(400).json({ message: "Invalid role provided" });
    }
    const user = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    ).select("-password");
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      message: "User role changed to Admin successfully!!",
      user,
      success: true,
    });
  } catch (error) {
    res

      .status(500)
      .json({ message: "Error in updating the user role", success: false });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log(userId);
    const user = await User.findByIdAndDelete({ _id: userId });
    console.log("user", user);
    if (!user) {
      res.status(404).json({ message: "User not found." });
    }
    await Task.deleteMany({ userId: userId });
    res.status(200).json({ message: "User and Tasks deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error in deleting the User" });
  }
};

const getUserTasks = async (req, res) => {
  try {
    const userId = req.params.id;
    const tasks = await Task.find({ userId: userId });
    res.status(200).json({ message: "Tasks fetched successfully", tasks });
  } catch (error) {
    res.status(500).json({ message: "Error in fetching Tasks of a User" });
  }
};

const deleteUserTasks = async (req, res) => {
  try {
    const userId = req.params.id;
    await Task.deleteMany({ userId: userId });
    res.status(200).json({
      message: "All Tasks of a user deleted successfully",
      success: true,
    });
  } catch (error) {
    res

      .status(500)
      .json({ message: "Error in deleting user tasks", success: false });
  }
};

const adminGetAllTasks = async (req, res) => {
  const tasks = await Task.find().populate(
    "userId",
    "firstName lastName email"
  );
  res
    .status(200)
    .json({ message: "All tasks fetched by admin successfully", tasks });
  try {
  } catch (error) {
    res

      .status(500)
      .json({ message: "Error in fetching all tasks Admin side." });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUserRole,
  getUserTasks,
  deleteUser,
  deleteUserTasks,
  adminGetAllTasks,
};
