import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Rejected from "./Pages/Admin/Rejected/Rejected";
import WaitingApproval from "./Pages/Admin/WaitingApproval/WaitingApproval";
import Login from "./Pages/Authentication/Login/Login";
import Employees from "./Pages/Home/Employees/Employees";
import HomePage from "./Pages/Home/HomePage/HomePage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/waitingApproval" element={<WaitingApproval />} />
        <Route path="/rejected" element={<Rejected />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
