const User = require("../models/user");

const getUserById = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findOne({ _id: userId });
  if (user === null) {
    res.status(404).json({ message: "User not found", success: false });
  }
  res.status(200).json({
    message: "User details fetched successfully",
    user,
    success: true,
  });
  try {
  } catch (error) {
    res.status(404).json({ message: error.message, success: false });
  }
};

module.exports = { getUserById };
