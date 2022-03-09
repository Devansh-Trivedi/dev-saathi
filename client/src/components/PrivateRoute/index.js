import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  if (localStorage.getItem("token") && localStorage.getItem("user")) {
    return children;
  }
  return <Navigate to="/login" replace />;
};

export default PrivateRoute;