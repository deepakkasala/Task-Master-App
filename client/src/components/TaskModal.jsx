import React from "react";

const TaskModal = ({
  newTask,

  handleInputChange,

  handleCloseModal,

  handleCreateTask,
}) => {
  return (
    <div className="fixed inset-0 bg-gray-900/20 dark:bg-gray-900/30 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-6 rounded-2xl shadow-2xl w-full max-w-md transition-all">
        <h2 className="text-2xl font-semibold mb-4 text-center border-b pb-2 dark:border-gray-700">
          Create New Task
        </h2>

        <input
          type="text"
          name="title"
          value={newTask.title}
          onChange={handleInputChange}
          placeholder="Title"
          className="w-full mb-3 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        <textarea
          name="description"
          value={newTask.description}
          onChange={handleInputChange}
          placeholder="Description"
          className="w-full mb-3 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
          rows="3"
        />

        <label className="text-sm mb-1 block font-medium text-gray-700 dark:text-gray-300">
          Due Date:
        </label>

        <input
          type="date"
          name="dueDate"
          value={newTask.dueDate}
          onChange={handleInputChange}
          className="w-full mb-4 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={handleCloseModal}
            className="px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-600 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleCreateTask}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
