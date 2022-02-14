import React from "react";
import { Link } from "react-router-dom";

const ManageSingleEmployee = ({ employee }) => {
  const { displayName, email, employeeInfo, user_id } = employee;
  return (
    <div className=" border-2 my-3 p-4">
      <div className="lg:flex justify-between">
        <div className="left lg:w-1/3">
          <img
            className="single-employee-img"
            src={employeeInfo?.photoURL}
            alt=""
          />
          <h1>Name: {displayName}</h1>
          <h2>Email: {email}</h2>
          <h1>Employee Id: {employeeInfo?.employeeId}</h1>
          <h1>Role ID: {employeeInfo?.role?.roleId}</h1>
          <h1>Role Description: {employeeInfo?.role.roleDes}</h1>
          <h1>NID no: {employeeInfo?.nid}</h1>
        </div>
        <div className="right lg:w-2/3 ">
          <h1>Address: {employeeInfo.address}</h1>
          <h1>Blood Group: {employeeInfo?.bloodGroup}</h1>
          <h1>Joining Date: {employeeInfo?.joiningDate}</h1>
          <h1>Resign Date: {employeeInfo?.resignDate}</h1>
          <h1>Salary: {employeeInfo?.salary} TK</h1>
          <p>About Info:</p>
          <p className=" font-thin text-gray-700 text-xl">
            {employeeInfo?.about} Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Quas, accusantium quasi tempore itaque eius
            deleniti molestias explicabo quis, deserunt repudiandae maxime,
            exercitationem hic quisquam corporis quia doloribus saepe voluptas.
            Enim similique odit magni officiis cumque. Perferendis quae earum
            expedita numquam veritatis laboriosam, voluptatibus debitis aliquam
            ex officiis! Voluptas, libero dolore. Lorem ipsum dolor sit amet,
            consectetur adipisicing elit. Aliquam nobis id totam odit
            asperiores, culpa, repellendus iste nam eaque sapiente, obcaecati
            quia repudiandae? Cum veniam molestias vitae repellendus nisi
            voluptatem provident voluptas. In, dolore? Quisquam eveniet fugiat
            aut voluptatibus est rem earum id voluptatem, voluptas voluptate
            ratione, labore, voluptates odit!
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
