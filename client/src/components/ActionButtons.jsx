import React from "react";

const ActionButtons = ({
  searchTerm,

  handleSearchChange,

  handleOpenModal,

  handleSortChange,

  sortOrder,

  handleDownloadReport,
}) => {
  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search tasks..."
          className="px-4 py-2 border border-red-900 dark:border-gray-700 rounded-lg w-full max-w-sm"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className="flex justify-end gap-3 items-center mb-6">
        <button
          onClick={handleOpenModal}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow"
        >
          + Create Task
        </button>

        <button
          onClick={handleSortChange}
          className="ml-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow"
        >
          Sort: {sortOrder === "asc" ? "Ascending" : "Descending"}
        </button>

        <button
          onClick={handleDownloadReport}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow"
        >
          Download Report
        </button>
      </div>
    </div>
  );
};

export default ActionButtons;
