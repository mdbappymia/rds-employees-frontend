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
      <h1 className="text-center text-4xl font-bold uppercase border-4 p-5 hover:bg-gray-400">
        Waiting for Approval
      </h1>
      {pendingEmployees.map((pendingEmployee) => (
        <SingleEmployee
          key={pendingEmployee._id}
          employee={pendingEmployee}
          setPendingEmployees={setPendingEmployees}
          pendingEmployees={pendingEmployees}
        />
      ))}
    </div>
  );
};

export default WaitingApproval;
