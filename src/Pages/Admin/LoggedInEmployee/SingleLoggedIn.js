import React, { useEffect, useState } from "react";

const SingleLoggedIn = ({ loggedInEmployee }) => {
  const [roleDes, setRoleDes] = useState("");
  useEffect(() => {
    fetch(`http://localhost:5000/roles/${loggedInEmployee.employeeInfo.roleId}`)
      .then((res) => res.json())
      .then((data) => {
        setRoleDes(data.roleDes);
      });
  }, [loggedInEmployee.employeeInfo.roleId]);
  return (
    <div key={loggedInEmployee._id} className="flex mb-3">
      <div className="mr-5">
        <img
          style={{ width: 100, height: 70 }}
          src={`data:image/jpeg;base64,${loggedInEmployee?.profileImage}`}
          alt=""
        />
      </div>
      <div>
        <h1>Name: {loggedInEmployee?.displayName}</h1>
        <h1>Role: {roleDes}</h1>
      </div>
    </div>
  );
};

export default SingleLoggedIn;
