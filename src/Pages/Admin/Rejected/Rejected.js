import React, { useEffect, useState } from "react";
import SingleEmployee from "../SingleEmployee/SingleEmployee";

const Rejected = () => {
  const [rejected, setRejected] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/user?approveStatus=Reject`)
      .then((res) => res.json())
      .then((data) => setRejected(data));
  }, []);
  return (
    <div>
      <h3>This is rejected user</h3>
      {rejected.map((rejectUser) => (
        <SingleEmployee employee={rejectUser} />
      ))}
    </div>
  );
};

export default Rejected;
