import React from "react";
import useStore from "../../../hooks/useStore";
import ManageSingleEmployee from "../ManageSingleEmployee/ManageSingleEmployee";

const EmployeeManagement = () => {
  const { employees } = useStore();
  return (
    <div>
      <h1 className="text-center uppercase font-bold text-4xl border-4 p-3 my-3 hover:bg-gray-400">
        Manage Employees
      </h1>
      <div className="employees-container">
        {employees.map((employee) => (
          <ManageSingleEmployee key={employee._id} employee={employee} />
        ))}
      </div>
    </div>
  );
};

export default EmployeeManagement;
