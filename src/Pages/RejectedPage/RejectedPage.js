import React from "react";
import { Navigate } from "react-router-dom";
import useStore from "../../hooks/useStore";

const RejectedPage = () => {
  const { user, isLoading } = useStore();
  if (user.approveStatus === "Pending" || !user.approveStatus) {
    return <Navigate to="/pending" />;
  }
  if (user.approveStatus === "Approved" || !user.email) {
    return <Navigate to="/" />;
  }
  if (isLoading) {
    return <h1 style={{ height: "100vh", textAlign: "center" }}>Loading...</h1>;
  }
  return (
    <div className="min-h-screen">
      <h1 className="text-center text-6xl my-10">You are rejected by admin</h1>
    </div>
  );
};

export default RejectedPage;
