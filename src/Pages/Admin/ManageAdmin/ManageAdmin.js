import React from "react";
import useStore from "../../../hooks/useStore";
import "./ManageAdmin.css";

const ManageAdmin = () => {
  const { employees, setEmployees, user } = useStore();
  const handleAdmin = (user_id, role) => {
    fetch(`http://localhost:5000/users/${user_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ role: role }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.acknowledged) {
          let remaingEmpArr = [];
          for (let emp of employees) {
            if (emp.user_id === user_id) {
              emp.role = role;
            }
            remaingEmpArr.push(emp);
          }
          setEmployees(remaingEmpArr);
          alert("Role Changed successfully");
        }
      });
  };
  return (
    <>
      <h1 className="text-center uppercase font-bold text-4xl border-4 p-3 my-3 hover:bg-gray-400">
        User Role Management
      </h1>
      <div className="user-container">
        {employees.map((employee) => (
          <div className="m-3 hover:shadow-2xl bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-end px-4 pt-4"></div>
            <div className="flex flex-col items-center pb-10">
              <img
                className="mb-3 w-24 h-24 rounded-full shadow-lg"
                src={employee?.employeeInfo?.photoURL}
                alt=""
              />
              <h3 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                {employee?.displayName}
              </h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {employee?.employeeInfo?.role?.roleDes}
              </span>
              <h1 className="text-xs p-3">User type: {employee?.role}</h1>
              <div className="flex mt-4 space-x-3 lg:mt-6">
                <button
                  disabled={employee.role === "Admin"}
                  onClick={() => handleAdmin(employee.user_id, "Admin")}
                  className="inline-flex items-center disabled:bg-gray-500 py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Make Admin
                </button>
                <button
                  disabled={
                    employee.role === "User" || employee.email === user.email
                  }
                  onClick={() => handleAdmin(employee.user_id, "User")}
                  className="inline-flex items-center disabled:bg-gray-500 py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Remove Admin
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ManageAdmin;
