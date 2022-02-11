import React from "react";
import useStore from "../../../hooks/useStore";
import Employee from "../Employee/Employee";

const Employees = () => {
  const { employees } = useStore();
  return (
    <div>
      <h1>All employees</h1>
      {employees.map((employee) => (
        <Employee key={employee._id} employee={employee} />
      ))}
    </div>
  );
};

export default Employees;
