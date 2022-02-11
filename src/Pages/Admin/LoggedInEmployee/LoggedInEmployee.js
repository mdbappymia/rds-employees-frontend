import React, { useEffect, useState } from "react";

const LoggedInEmployee = () => {
  const [loggedInEmployees, setLoggedInEmployees] = useState();
  // get login employees
  useEffect(() => {
    fetch(`http://localhost:5000/user?isLogin=${true}`)
      .then((res) => res.json())
      .then((data) => setLoggedInEmployees(data));
  }, []);
  console.log(loggedInEmployees);
  return (
    <div>
      <h2>This is all loggedin employees</h2>
    </div>
  );
};

export default LoggedInEmployee;
