import React from "react";
import { Navigate } from "react-router-dom";
import useStore from "../../hooks/useStore";

const RejectedPage = () => {
  const { user } = useStore();
  if (user.approveStatus !== "Approved") {
    return <Navigate to="/pending" />;
  }
  if (user.approveStatus === "Approved") {
    return <Navigate to="/" />;
  }
  return (
    <div className="min-h-screen">
      <h1 className="text-center text-6xl my-10">You are rejected by admin</h1>
    </div>
  );
};

export default RejectedPage;
