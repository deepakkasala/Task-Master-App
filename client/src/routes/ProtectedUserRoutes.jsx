import React from "react";

import { Navigate } from "react-router-dom";

import { useSelector } from "react-redux";

const ProtectedUserRoutes = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  return user && user.role === "user" ? children : <Navigate to="/" />;
};

export default ProtectedUserRoutes;
