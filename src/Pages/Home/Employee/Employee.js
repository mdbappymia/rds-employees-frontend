import React from "react";
import { Link } from "react-router-dom";

const Employee = ({ employee }) => {
  return (
    <div className="m-3 hover:shadow-2xl bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-end px-4 pt-4"></div>
      <div className="flex flex-col items-center pb-10">
        <img
          className="mb-3 w-24 h-24 rounded-full shadow-lg"
          src={`data:image/jpeg;base64,${employee?.profileImage}`}
          alt=""
        />
        <h3 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {employee?.displayName}
        </h3>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {employee?.employeeInfo?.role?.roleDes}
        </span>
        <div className="flex mt-4 space-x-3 lg:mt-6">
          <Link
            to={`/employeeDetails/${employee.user_id}`}
            className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Employee;
