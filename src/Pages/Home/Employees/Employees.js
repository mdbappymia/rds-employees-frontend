import React from "react";
import useStore from "../../../hooks/useStore";
import Employee from "../Employee/Employee";

const Employees = () => {
  const { employees } = useStore();
  return (
    <div className="container px-4 mx-auto">
      <h1 className="text-center text-4xl uppercase font-bold my-3 border-4 p-3">
        All employees
      </h1>
      {employees.map((employee) => (
        <Employee key={employee._id} employee={employee} />
      ))}
    </div>
  );
};

export default Employees;
