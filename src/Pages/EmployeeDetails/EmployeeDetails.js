/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useStore from "../../hooks/useStore";
import "./EmployeeDetails.css";

const EmployeeDetails = () => {
  const { user_id } = useParams();
  const { employees } = useStore();
  const [roleDes, setRoleDes] = useState("");
  let employee = [];
  if (employees.length) {
    employee = employees?.filter((emp) => emp.user_id === user_id);
  }
  useEffect(() => {
    fetch(`http://localhost:5000/roles/${employee[0].employeeInfo.roleId}`)
      .then((res) => res.json())
      .then((data) => {
        setRoleDes(data.roleDes);
      });
  }, [employee[0].employeeInfo.roleId]);
  return (
    <div className="container mx-auto px-4 profile-home-container mb-9">
      <h1 className="text-center uppercase text-5xl font-bold my-3 py-3 border-4 hover:bg-gray-400">
        Profile
      </h1>
      <div className="grid profile-part-container">
        <div className="left bg-black py-10 text-white">
          <div>
            <img
              className="employee-profile-photo mx-auto"
              src={`data:image/jpeg;base64,${employee[0]?.profileImage}`}
              alt=""
            />
            <div className="w-2/3 mx-auto my-5 text-center">
              <h1 className="text-3xl">{employee[0]?.displayName}</h1>
              <h1 className=" text-sm my-3">
                {employee[0]?.employeeInfo?.address}
              </h1>
              <div className="text-left mt-10">
                <h1 className="font-bold text-xl">Contact Me:</h1>
                <h1 className="text-gray-300">{employee[0]?.email}</h1>
              </div>
            </div>
          </div>
        </div>

        <div className="right ml-5">
          <h1 className=" uppercase font-bold my-2 text-2xl">
            Personal Information
          </h1>
          <hr />
          <h1 className=" font-bold mt-3">Blood Group:</h1>
          <h1 className="mb-5">{employee[0]?.employeeInfo?.bloodGroup}</h1>
          <h1 className=" font-bold">About:</h1>
          <h1 className="mb-5">{employee[0]?.employeeInfo?.about}</h1>

          <h1 className=" uppercase font-bold my-2 text-2xl">
            Working Information
          </h1>
          <hr />
          <h1 className="font-bold mt-3">Employee ID:</h1>
          <h1 className="mb-5">{employee[0]?.employeeInfo?.employeeId}</h1>
          <h1 className="font-bold">Role Description:</h1>
          <h1 className="mb-5">{roleDes || "_"}</h1>
          <h1 className="font-bold">Joining Date:</h1>
          <h1 className="mb-5">
            {new Date(employee[0]?.employeeInfo?.joiningDate).toDateString()}
          </h1>
          <h1 className="font-bold">Resign Date:</h1>
          <h1>{employee[0]?.employeeInfo?.resignDate || "Present"}</h1>
        </div>
      </div>
      <Link to="/">
        <button className="mt-8 text-blue-700 font-bold text-xl hover:text-blue-500 underline">
          &lt;&lt; Back to home
        </button>
      </Link>
    </div>
  );
};

export default React.memo(EmployeeDetails);
