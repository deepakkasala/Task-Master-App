import React from "react";

const PasswordModal = ({
  newPassword,

  handlePasswordChange,

  setPasswordModal,

  handlePasswordUpdate,
}) => {
  return (
    <div className="fixed inset-0 bg-gray-900/20 dark:bg-gray-900/30 bg-opacity-30 dark:bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-96 transition-all">
        <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-6">
          Change Password
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              New Password
            </label>

            <input
              type="password"
              name="password"
              value={newPassword.password}
              onChange={handlePasswordChange}
              placeholder="Enter New Password"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              value={newPassword.confirmPassword}
              onChange={handlePasswordChange}
              placeholder="Enter Confirm Password"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-end mt-6 space-x-3">
          <button
            onClick={() => setPasswordModal(false)}
            className="px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-500 transition"
          >
            Cancel
          </button>

          <button
            onClick={handlePasswordUpdate}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordModal;
