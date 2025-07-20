const User = require("../models/user");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      return res

        .status(403)
        .json({ message: "User already exist, Please Login", success: false });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    return res.status(201).json({
      message: "Registration successful, Please Login!",
      savedUser,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message, success: false });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    // console.log("User from login cntrlr:", !user);
    if (user === null) {
      return res.status(404).json({
        message: "User not exist with the email, Please Register!",
        success: false,
      });
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res

        .status(401)
        .json({ message: "Invalid Password!", success: false });
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );
    res

      .status(200)
      .json({ message: "Login Successful", token: token, user, success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const passwordUpdate = async (req, res) => {
  try {
    console.log("Body", req.body);
    const { password } = req.body;
    const userId = req.userId;
    // console.log(userId, password);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await User.findByIdAndUpdate(userId, { password: hashedPassword });
    // const savedUser = await user.save();
    res.status(201).json({
      message: "Password Updated successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login, passwordUpdate };
