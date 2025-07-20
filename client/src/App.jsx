import React from "react";

import { Route, Routes } from "react-router-dom";

import { useSelector } from "react-redux";

import Login from "./pages/Login";

import Register from "./pages/Register";

import TasksPage from "./pages/TasksPage";

// Admin Pages

import AdminDashboard from "./pages/admin/AdminDashboard";

import UserDetailPage from "./pages/admin/UserDetailPage";

// Protected Routes

import ProtectedUserRoutes from "./routes/ProtectedUserRoutes";

import ProtectedAdminRoutes from "./routes/ProtectedAdminRoutes";

import PageNotFound from "./components/PageNotFound";

const App = () => {
  const themeMode = useSelector((state) => state.theme.mode);

  return (
    <div className={themeMode === "dark" ? "dark" : ""}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
        <Routes>
          {/* Public Routes */}

          <Route path="/" element={<Login />} />

          <Route path="/register" element={<Register />} />

          {/* User Protected Route */}

          <Route
            path="/tasks"
            element={
              <ProtectedUserRoutes>
                <TasksPage />
              </ProtectedUserRoutes>
            }
          />

          {/* Admin Protected Routes */}

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedAdminRoutes>
                <AdminDashboard />
              </ProtectedAdminRoutes>
            }
          />

          <Route
            path="/admin/user/:id"
            element={
              <ProtectedAdminRoutes>
                <UserDetailPage />
              </ProtectedAdminRoutes>
            }
          />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
