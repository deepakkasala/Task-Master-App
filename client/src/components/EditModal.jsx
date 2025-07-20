import React from "react";

const EditModal = ({
  editData,

  setEditData,

  setIsEditModalOpen,

  handleUpdate,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl w-full max-w-lg shadow-xl">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
          Edit Task
        </h2>

        <input
          type="text"
          value={editData.title}
          onChange={(e) => setEditData({ ...editData, title: e.target.value })}
          placeholder="Title"
          className="w-full p-3 mb-4 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
        />

        <textarea
          value={editData.description}
          onChange={(e) =>
            setEditData({ ...editData, description: e.target.value })
          }
          placeholder="Description"
          className="w-full p-3 mb-4 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
        />

        <select
          value={editData.status}
          onChange={(e) => setEditData({ ...editData, status: e.target.value })}
          className="w-full p-3 mb-4 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          <option value="todo">To Do</option>

          <option value="in progress">In Progress</option>

          <option value="done">Done</option>
        </select>

        <input
          type="date"
          value={editData.dueDate?.slice(0, 10)}
          onChange={(e) =>
            setEditData({ ...editData, dueDate: e.target.value })
          }
          className="w-full p-3 mb-6 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
        />

        <div className="flex justify-end gap-4">
          <button
            onClick={() => setIsEditModalOpen(false)}
            className="px-4 py-2 rounded-md bg-gray-400 hover:bg-gray-500 text-white"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            className="px-4 py-2 rounded-md bg-purple-600 hover:bg-purple-700 text-white"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
