import React, { useEffect, useState } from "react";
import useStore from "../../../hooks/useStore";

const LoggedInEmployee = () => {
  const [loggedInEmployees, setLoggedInEmployees] = useState([]);
  const { token } = useStore();
  // get login employees
  useEffect(() => {
    fetch(`http://localhost:5000/user?isLogin=${true}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setLoggedInEmployees(data));
  }, [token]);
  return (
    <div>
      <h2 className="text-center font-bold uppercase border-4 my-3 p-3 text-4xl hover:bg-gray-400">
        Logged In Employee
      </h2>

      {loggedInEmployees.length &&
        loggedInEmployees?.map((loggedInEmployee) => (
          <div key={loggedInEmployee._id} className="flex mb-3">
            <div className="mr-5">
              <img
                style={{ width: 100, height: 70 }}
                src={loggedInEmployee?.employeeInfo?.photoURL}
                alt=""
              />
            </div>
            <div>
              <h1>Name: {loggedInEmployee?.displayName}</h1>
              <h1>Role: {loggedInEmployee?.employeeInfo?.role?.roleDes}</h1>
            </div>
          </div>
        ))}
    </div>
  );
};

export default LoggedInEmployee;
