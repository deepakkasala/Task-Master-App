const express = require("express");
const router = express.Router();
const isAdmin = require("../middlewares/adminMiddleware");
const authMiddleWare = require("../middlewares/authMiddleware");
const {
  adminGetAllTasks,
  getAllUsers,
  getUserById,
  updateUserRole,
  deleteUser,
  getUserTasks,
  deleteUserTasks,
} = require("../controllers/admin");

router.get("/tasks", authMiddleWare, isAdmin, adminGetAllTasks);
router.get("/users", authMiddleWare, isAdmin, getAllUsers);
router.get("/user/:id", authMiddleWare, isAdmin, getUserById);
router.put("/user/:id/role", authMiddleWare, isAdmin, updateUserRole);
router.delete("/user/:id", authMiddleWare, isAdmin, deleteUser);
router.get("/user/:id/tasks", authMiddleWare, isAdmin, getUserTasks);
router.delete("/user/:id/tasks", authMiddleWare, isAdmin, deleteUserTasks);

module.exports = router;
