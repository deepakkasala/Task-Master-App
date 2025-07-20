import React from "react";
import { MdDashboard } from "react-icons/md";
import { FiFileText, FiPlus, FiLock, FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { clearAuth } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ onForgotPasswordClick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const token = useSelector((state) => state.auth.token);
  const handleLogout = () => {
    dispatch(clearAuth());

    navigate("/");
  };
  return (
    <aside className="w-64 h-screen bg-white dark:bg-gray-900 p-6 shadow-md">
      <div className="text-2xl font-bold text-purple-600 mb-10">TaskMaster</div>

      <nav className="space-y-4">
        <button className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-purple-600">
          <MdDashboard /> Dashboard
        </button>

        <button className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-purple-600">
          <FiPlus /> Create Task
        </button>

        <button className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-purple-600">
          <FiFileText /> Manage Tasks
        </button>

        <button
          onClick={onForgotPasswordClick}
          className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-purple-600"
        >
          <FiLock /> Change Password
        </button>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-500 hover:text-red-700 mt-4"
        >
          <FiLogOut /> Logout
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
