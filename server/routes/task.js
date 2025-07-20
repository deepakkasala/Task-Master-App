const express = require("express");
const router = express.Router();
const authMiddleWare = require("../middlewares/authMiddleware");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/task");

router.get("/all", authMiddleWare, getTasks);
router.post("/createTask", authMiddleWare, createTask);
router.put("/update/:taskId", authMiddleWare, updateTask);
router.delete("/delete/:taskId", authMiddleWare, deleteTask);

module.exports = router;
