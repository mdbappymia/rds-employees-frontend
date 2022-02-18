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
import ProfileHome from "./Pages/Profile/ProfileHome/ProfileHome";
import PrivetRoute from "./Pages/Authentication/PrivetRoute/PrivetRoute";
import PendingPage from "./Pages/PendingPage/PendingPage";
import RejectedPage from "./Pages/RejectedPage/RejectedPage";
import AdminRoute from "./Pages/Authentication/AdminRoute/AdminRoute";
import EmployeeDetails from "./Pages/EmployeeDetails/EmployeeDetails";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";

const App = () => {
  return (
    <BrowserRouter>
      <AppBar />
      <div className="h-85vh">
        <Routes>
          <Route
            path="/"
            element={
              <PrivetRoute>
                <HomePage />
              </PrivetRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/employees"
            element={
              <PrivetRoute>
                <Employees />
              </PrivetRoute>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<ProfileHome />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route
            path="/adminDashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          >
            <Route index={true} element={<EmployeeManagement />} />
            <Route path="employeeManagement" element={<EmployeeManagement />} />
            <Route path="waitingApproval" element={<WaitingApproval />} />
            <Route path="rejected" element={<Rejected />} />
            <Route path="loggedEmployees" element={<LoggedInEmployee />} />
            <Route path="adminManagement" element={<ManageAdmin />} />
            <Route
              path="updateEmployee/:user_id"
              element={<UpdateEmployee />}
            />
          </Route>
          <Route
            path="/employeeDetails/:user_id"
            element={
              <PrivetRoute>
                <EmployeeDetails />
              </PrivetRoute>
            }
          />
          <Route path="/pending" element={<PendingPage />} />
          <Route path="/rejected" element={<RejectedPage />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
