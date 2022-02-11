import React from "react";
const SingleEmployee = ({ employee }) => {
  const { displayName, email, approveStatus, user_id } = employee;

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
        .then((data) => console.log(data));
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
        .then((data) => console.log(data));
    }
  };

  return (
    <div>
      <h1>Name: {displayName}</h1>
      <h2>Email: {email}</h2>
      <h3>Status: {approveStatus}</h3>
      <h6>User Id: {user_id}</h6>
      {!approveStatus === "Reject" && (
        <>
          <button onClick={handleApprove}>Approve</button>
          <button onClick={handleReject}>Reject</button>
        </>
      )}
    </div>
  );
};

export default SingleEmployee;
