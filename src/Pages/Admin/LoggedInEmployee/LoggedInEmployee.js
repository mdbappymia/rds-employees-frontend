import React from "react";
import useStore from "../../../hooks/useStore";
import SingleLoggedIn from "./SingleLoggedIn";

const LoggedInEmployee = () => {
  const { loggedInEmployees } = useStore();
  return (
    <div>
      <h2 className="text-center font-bold uppercase border-4 my-3 p-3 text-4xl hover:bg-gray-400">
        Logged In Employee
      </h2>
      {loggedInEmployees.length &&
        loggedInEmployees?.map((loggedInEmployee) => (
          <SingleLoggedIn loggedInEmployee={loggedInEmployee} />
        ))}
    </div>
  );
};

export default LoggedInEmployee;
