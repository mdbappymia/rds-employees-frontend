/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import useStore from "../../../hooks/useStore";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [openNav, setOpenNav] = useState(false);
  const { logOut } = useStore();
  return (
    <div className="admin-dashboard">
      <div className="relative min-h-screen md:flex">
        {/* <!-- mobile menu bar --> */}
        <div className="bg-gray-800 text-gray-100 flex justify-between md:hidden">
          {/* <!-- logo --> */}
          <Link to="/" className="block p-4 text-white font-bold">
            RDS Employees
          </Link>

          {/* <!-- mobile menu button --> */}
          <button
            onClick={() => setOpenNav(!openNav)}
            className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-700"
          >
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* <!-- sidebar --> */}
        <div
          onClick={() => setOpenNav(false)}
          className={`sidebar bg-black z-40 text-blue-100 w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform  md:relative md:translate-x-0 transition duration-200 ease-in-out ${
            !openNav ? "-translate-x-full" : ""
          }`}
        >
          {/* <!-- logo --> */}
          <Link to="/" className="text-white flex items-center space-x-2 px-4">
            <svg
              className="w-8 h-8"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            <span className="text-xl font-extrabold">RDS</span>
          </Link>

          {/* <!-- nav --> */}
          <nav>
            <NavLink
              to="employeeManagement"
              className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white"
            >
              Manage Employee
            </NavLink>
            <NavLink
              to="loggedEmployees"
              className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white"
            >
              Logged In Employees
            </NavLink>

            <NavLink
              to={`rejected`}
              className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white"
            >
              Rejected
            </NavLink>

            <NavLink
              to="waitingApproval"
              className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white"
            >
              Waiting List
            </NavLink>

            <NavLink
              to="adminManagement"
              className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white"
            >
              Admin Management
            </NavLink>

            <Link
              to="/"
              className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white"
            >
              Back to home
            </Link>
            <div className="my-5 py-2.5 px-4">
              <button
                onClick={logOut}
                className="bg-red-700 px-3 py-2 hover:bg-red-800 rounded"
              >
                Log Out
              </button>
            </div>
          </nav>
        </div>

        {/* <!-- content --> */}
        <div className="flex-1 lg:p-10 sm:p-3 text-xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
