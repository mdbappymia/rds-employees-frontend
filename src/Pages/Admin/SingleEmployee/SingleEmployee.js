import React from "react";
const SingleEmployee = ({ employee }) => {
  const { displayName, email, approveStatus, user_id, employeeInfo } = employee;

  const handleApprove = () => {
    const isApprove = window.confirm(
      "Are you sure to approve this user to be an employee?"
    );
    if (isApprove) {
      console.log("Approved");
      fetch(`http://localhost:5000/userApprove/${user_id}?email=${email}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ approveStatus: "Approved" }),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.acknowledged) {
            alert("Update successfully");
          }
        });
    }
  };
  const handleReject = () => {
    const isReject = window.confirm("Are you sure to reject this user?");
    if (isReject) {
      console.log("Reject");
      fetch(`http://localhost:5000/userApprove/${user_id}?email=${email}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ approveStatus: "Reject" }),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.acknowledged) {
            alert("Update successfully");
          }
        });
    }
  };

  return (
    <div className="border-4 my-3 p-5 border-green-700">
      <div className="flex">
        <div className="left">
          <img src={employeeInfo?.photoURL} alt="" />
          <h1>Name: {displayName}</h1>
          <h2>Email: {email}</h2>
        </div>
      </div>

      <h3>Status: {approveStatus}</h3>
      <h6>User Id: {user_id}</h6>
      {approveStatus !== "Reject" && (
        <>
          <button
            className="bg-indigo-700 hover:bg-indigo-500 px-5 pb-2 text-white my-3 rounded"
            onClick={handleApprove}
          >
            Approve
          </button>
          <button
            className="bg-red-700 hover:bg-red-500 ml-3 px-5 pb-2 text-white my-3 rounded"
            onClick={handleReject}
          >
            Reject
          </button>
        </>
      )}
    </div>
  );
};

export default SingleEmployee;
