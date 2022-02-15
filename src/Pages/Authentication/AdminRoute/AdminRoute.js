import React from "react";
import { Navigate, useLocation } from "react-router";
import useStore from "../../../hooks/useStore";

const AdminRoute = ({ children }) => {
  const { user, isLoading } = useStore();
  const location = useLocation();
  if (isLoading) {
    return <h1 style={{ height: "100vh", textAlign: "center" }}>Loading...</h1>;
  }
  if (user.role === "Admin") {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} />;
};

export default AdminRoute;
