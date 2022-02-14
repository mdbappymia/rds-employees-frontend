import React from "react";

const Employee = ({ employee }) => {
  const { displayName, email, role, approveStatus, isLogin } = employee;
  console.log(employee);
  return (
    <div>
      <h3>Name: {displayName}</h3>
      <h4>Email: {email}</h4>
      <h4>Role: {role}</h4>
      <h5>Approve Status: {approveStatus}</h5>
      <h6>Login Status: {isLogin.toString()}</h6>
    </div>
  );
};

export default Employee;
