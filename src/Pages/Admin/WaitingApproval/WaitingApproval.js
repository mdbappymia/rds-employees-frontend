import React from "react";
import useStore from "../../../hooks/useStore";
import SingleEmployee from "../SingleEmployee/SingleEmployee";

const WaitingApproval = () => {
  const { pendingEmployees, setPendingEmployees } = useStore();

  return (
    <div>
      <h1 className="text-center text-4xl font-bold uppercase border-4 p-5 hover:bg-gray-400">
        Waiting for Approval
      </h1>
      {pendingEmployees.length &&
        pendingEmployees.map((pendingEmployee) => (
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
