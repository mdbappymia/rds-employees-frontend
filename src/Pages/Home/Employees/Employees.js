import React from "react";
import useStore from "../../../hooks/useStore";
import Employee from "../Employee/Employee";
import "./Employees.css";

const Employees = () => {
  const { employees } = useStore();
  return (
    <div className="container px-4 mx-auto">
      <h1 className="text-center text-4xl uppercase font-bold my-3 border-4 p-3 hover:bg-gray-300">
        All employees
      </h1>
      <div className="employee-card-container">
        {employees.length &&
          employees?.map((employee) => (
            <Employee key={employee._id} employee={employee} />
          ))}
      </div>
    </div>
  );
};

export default Employees;
