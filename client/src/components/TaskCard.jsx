import React, { useState } from "react";

import { FiEdit2, FiTrash2 } from "react-icons/fi";

import axios from "axios";

import moment from "moment";

import EditModal from "./EditModal";

import toast, { Toaster } from "react-hot-toast";
import { API_URL } from "../utils/constants";

const TaskCard = ({ task, token, onEdit, onDelete, fetchTasks }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [editData, setEditData] = useState({
    title: task.title,

    description: task.description,

    status: task.status,

    dueDate: task.dueDate,
  });

  // console.log(token);

  let bg = "";

  if (task.status === "todo") bg = "text-blue-500";

  if (task.status === "in progress") bg = "text-red-500";

  if (task.status === "done") bg = "text-green-500";

  const handleUpdate = async () => {
    try {
      console.log(editData);

      const response = await axios.put(
        `${API_URL}/tasks/update/${task._id}`,

        editData,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await fetchTasks();

      toast.success(response.data.message);

      if (onEdit) {
        onEdit(task);
      }

      setIsEditModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-300 dark:border-gray-700 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out relative">
        <div className="absolute top-3 right-3 flex gap-3">
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-yellow-100 dark:hover:bg-yellow-600 transition"
          >
            <FiEdit2 className="text-gray-600 dark:text-gray-300" />
          </button>

          <button
            onClick={() => onDelete(task._id)}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-red-100 dark:hover:bg-red-600 transition"
          >
            <FiTrash2 className="text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          {task.title}
        </h3>

        <p className="text-md text-gray-600 dark:text-gray-300 mb-4">
          {task.description}
        </p>

        <div className="flex justify-between items-center mt-6">
          <div>
            <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
              Status:
            </span>

            <span
              className={
                "ml-2 px-3 py-1 font-bold " +
                bg +
                " text-white" +
                bg +
                " bg-opacity-80"
              }
            >
              {task.status}
            </span>
          </div>

          <div>
            <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
              Due:
            </span>

            <span className="ml-2 text-sm font-medium text-gray-800 dark:text-white bg-purple-100 dark:bg-purple-700 px-3 py-1 rounded-full">
              {moment(task.dueDate).format("YYYY-MM-DD")}
            </span>
          </div>
        </div>

        {isEditModalOpen && (
          <EditModal
            editData={editData}
            setEditData={setEditData}
            setIsEditModalOpen={setIsEditModalOpen}
            handleUpdate={handleUpdate}
          />
        )}
      </div>
    </>
  );
};

export default TaskCard;
