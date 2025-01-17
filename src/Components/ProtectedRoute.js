import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, role }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    // Redirect to a "not authorized" page if the role doesn't match
    return <Navigate to="/not-authorized" replace />;
  }

  // Render the child component if authorized
  return children;
};

export default ProtectedRoute;
