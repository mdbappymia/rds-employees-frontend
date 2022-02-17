import React from "react";
import { Link, useParams } from "react-router-dom";
import useStore from "../../hooks/useStore";
import "./EmployeeDetails.css";

const EmployeeDetails = () => {
  const { user_id } = useParams();
  const { employees } = useStore();
  let employee = {};
  if (employees.length) {
    employee = employees?.filter((emp) => emp.user_id === user_id);
  }
  return (
    <div className="container mx-auto px-4 profile-home-container mb-9">
      <h1 className="text-center uppercase text-5xl font-bold my-3 py-3 border-4 hover:bg-gray-400">
        Profile
      </h1>
      <div className="relative">
        <img
          src="https://japandesk.basis.org.bd/public/storage/upload/comapny_logo/xPmNR8MQ0CFHBbzZJVtBa6b8eLFQ2ZkXgApb4jLE.jpeg"
          alt=""
          className="w-full h-80 border-4 border-dashed p-5 relative"
        />
        <img
          className="employee-profile-photo"
          src={employee[0]?.employeeInfo?.photoURL}
          alt=""
        />
      </div>
      <div className="profile-info w-2/3">
        <h1 className="text-4xl my-3">{employee[0]?.displayName}</h1>
        <h1>
          <span className="font-bold">Email:</span> {employee[0]?.email}
        </h1>
        <h1>
          <span className="font-bold">Employee ID:</span>{" "}
          {employee[0]?.employeeInfo?.employeeId}
        </h1>
        <h1>
          <span className="font-bold">Role ID:</span>{" "}
          {employee[0]?.employeeInfo?.role?.roleId}
        </h1>
        <h1>
          <span className="font-bold">Role Description:</span>{" "}
          {employee[0]?.employeeInfo?.role?.roleDes}
        </h1>

        <h1>
          <span className="font-bold">Blood Group:</span>{" "}
          {employee[0]?.employeeInfo?.bloodGroup}
        </h1>
        <h1>
          <span className="font-bold">Joining Date:</span>{" "}
          {new Date(employee[0]?.employeeInfo?.joiningDate).toDateString()}
        </h1>
        <h1>
          <span className="font-bold">Resign Date:</span>{" "}
          {employee[0]?.employeeInfo?.resignDate}
        </h1>
        <h1>
          <span className="font-bold">Address:</span>{" "}
          {employee[0]?.employeeInfo?.address}
        </h1>
        <h1>
          <span className="font-bold">About:</span>{" "}
          {employee[0]?.employeeInfo?.about}
        </h1>
      </div>
      <Link to="/">
        <button className="mt-8 text-blue-700 font-bold text-xl hover:text-blue-500 underline">
          &lt;&lt; Back to home
        </button>
      </Link>
    </div>
  );
};

export default EmployeeDetails;
