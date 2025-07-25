import React from "react";

import { Navigate } from "react-router-dom";

import { useSelector } from "react-redux";

const ProtectedAdminRoutes = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  return user && user.role === "admin" ? children : <Navigate to="/" />;
};

export default ProtectedAdminRoutes;
