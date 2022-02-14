import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Rejected from "./Pages/Admin/Rejected/Rejected";
import WaitingApproval from "./Pages/Admin/WaitingApproval/WaitingApproval";
import Login from "./Pages/Authentication/Login/Login";
import Employees from "./Pages/Home/Employees/Employees";
import HomePage from "./Pages/Home/HomePage/HomePage";
import AppBar from "./Pages/Shared/Appbar/Appbar";
import AdminDashboard from "./Pages/Admin/AdminDashboard/AdminDashboard";
import LoggedInEmployee from "./Pages/Admin/LoggedInEmployee/LoggedInEmployee";
import EmployeeManagement from "./Pages/Admin/EmployeeManagement/EmployeeManagement";
import ManageAdmin from "./Pages/Admin/ManageAdmin/ManageAdmin";
import Footer from "./Pages/Shared/Footer/Footer";
import UpdateEmployee from "./Pages/Admin/UpdateEmployee/UpdateEmployee";
import About from "./Pages/About/About";

const App = () => {
  return (
    <BrowserRouter>
      <AppBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/about" element={<About />} />
        <Route path="/adminDashboard" element={<AdminDashboard />}>
          <Route index={true} element={<EmployeeManagement />} />
          <Route path="employeeManagement" element={<EmployeeManagement />} />
          <Route path="waitingApproval" element={<WaitingApproval />} />
          <Route path="rejected" element={<Rejected />} />
          <Route path="loggedEmployees" element={<LoggedInEmployee />} />
          <Route path="adminManagement" element={<ManageAdmin />} />
          <Route path="updateEmployee/:user_id" element={<UpdateEmployee />} />
        </Route>
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
