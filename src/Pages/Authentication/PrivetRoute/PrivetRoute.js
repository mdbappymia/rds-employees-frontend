import React from "react";
import { Navigate, useLocation } from "react-router";
import useStore from "../../../hooks/useStore";

const PrivetRoute = ({ children }) => {
  const { user, isLoading } = useStore();
  const location = useLocation();
  if (isLoading) {
    return <h1 style={{ height: "100vh", textAlign: "center" }}>Loading...</h1>;
  }
  if (user.email) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} />;
};

export default PrivetRoute;
