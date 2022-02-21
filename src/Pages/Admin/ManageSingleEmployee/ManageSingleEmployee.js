import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ManageSingleEmployee = ({ employee }) => {
  const { displayName, email, employeeInfo, user_id, profileImage } = employee;
  const [roleDes, setRoleDes] = useState("");
  useEffect(() => {
    fetch(`http://localhost:5000/roles/${employeeInfo.roleId}`)
      .then((res) => res.json())
      .then((data) => {
        setRoleDes(data.roleDes);
      });
  }, [employeeInfo.roleId]);
  return (
    <div className=" border-2 my-3 p-4">
      <div className="lg:flex justify-between">
        <div className="left lg:w-1/3">
          <img
            className="single-employee-img"
            src={`data:image/jpeg;base64,${profileImage}`}
            alt=""
          />
          <h1>Name: {displayName}</h1>
          <h2>Email: {email}</h2>
          <h1>Employee Id: {employeeInfo?.employeeId}</h1>
          <h1>Role Description: {roleDes}</h1>
          <h1>NID no: {employeeInfo?.nid}</h1>
        </div>
        <div className="right lg:w-2/3 ">
          <h1>Address: {employeeInfo?.address}</h1>
          <h1>Blood Group: {employeeInfo?.bloodGroup}</h1>
          <h1>
            Joining Date: {new Date(employeeInfo?.joiningDate).toDateString()}
          </h1>
          <h1>Resign Date: {employeeInfo?.resignDate}</h1>
          <h1>Salary: {employeeInfo?.salary} TK</h1>
          <p>About Info:</p>
          <p className=" font-thin text-gray-700 text-xl">
            {employeeInfo?.about}
          </p>
        </div>
      </div>
      <Link to={`/adminDashboard/updateEmployee/${user_id}`}>
        <button className="bg-indigo-700 pb-2 px-3 mt-4 text-white font-bold rounded hover:bg-indigo-500">
          Update
        </button>
      </Link>
    </div>
  );
};

export default ManageSingleEmployee;
