const express = require("express");
const authMiddleWare = require("../middlewares/authMiddleware");
const { getUserById } = require("../controllers/user");
const router = express.Router();

router.get("/get/:userId", authMiddleWare, getUserById);

module.exports = router;
