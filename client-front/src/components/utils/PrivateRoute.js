import React from "react";
import { Navigate } from "react-router-dom";
import { AuthProvider } from "../auth/AuthContext";
import { useAuth } from "../auth/AuthContext";

function PrivateRoute({ children, role }) {
  const { userIsAuthenticated } = useAuth();
  const authProv = new AuthProvider();
  let userRole = null;
  try {
    userRole = authProv.getUserRole();
  } catch (error) {
    userRole = null;
  }
  if (!userIsAuthenticated()) {
    return <Navigate to="/login" />;
  }

  if (role && !Array.isArray(role)) {
    role = [role];
  }
  if (role && !role.includes(userRole)) {
    if (userRole === "USER") {
      return <Navigate to="/user" />;
    } else if (userRole === "ADMIN") {
      return <Navigate to="/admin" />;
    } else return <Navigate to="/login" />;
  }
  return children;
}

export default PrivateRoute;
