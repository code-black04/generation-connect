import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const getRoleFromToken = () => {
  const token = document.cookie.split("; ").find(row => row.startsWith("accessToken="));
  if (!token) return null;

  try {
    const decoded = jwtDecode(token.split("=")[1]);
    return decoded.roles || [];
  } catch (e) {
    return null;
  }
};

const ProtectedRoute = ({ children, allowedRoles }) => {
  const roles = getRoleFromToken();

  if (!roles) {
    return <Navigate to="/" replace />;
  }

  const hasAccess = allowedRoles.some(role => roles.includes(role));
  return hasAccess ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
