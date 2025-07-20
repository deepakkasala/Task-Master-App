import React from "react";

const Filters = ({ handleStatusClick, taskCounts, activeFilter }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-4 mb-6 text-sm font-medium">
        {["all", "todo", "in progress", "done"].map((filter) => (
          <button
            key={filter}
            className={`px-4 py-2 rounded-full border transition ${
              activeFilter === filter
                ? "bg-purple-600 text-white border-purple-600"
                : "border-gray-300 text-gray-700 dark:text-gray-200"
            }`}
            onClick={() => handleStatusClick(filter)}
          >
            {}
            {filter.charAt(0).toUpperCase() + filter.slice(1)} (
            {taskCounts[filter]})
          </button>
        ))}
      </div>
    </div>
  );
};

export default Filters;
