import React, { useEffect, useState } from "react";
import SingleEmployee from "../SingleEmployee/SingleEmployee";

const WaitingApproval = () => {
  const [pendingEmployees, setPendingEmployees] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/user?approveStatus=Pending`)
      .then((res) => res.json())
      .then((data) => setPendingEmployees(data));
  }, []);
  return (
    <div>
      {pendingEmployees.map((pendingEmployee) => (
        <SingleEmployee key={pendingEmployee._id} employee={pendingEmployee} />
      ))}
    </div>
  );
};

export default WaitingApproval;
