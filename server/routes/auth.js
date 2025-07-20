const express = require("express");
const { register, login, passwordUpdate } = require("../controllers/auth");
const authMiddleWare = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/update/password", authMiddleWare, passwordUpdate);

module.exports = router;
