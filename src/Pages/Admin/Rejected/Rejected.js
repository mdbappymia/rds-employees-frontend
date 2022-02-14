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
      <h3 className="text-center font-bold text-4xl border-4 p-3 my-3 uppercase hover:bg-gray-400">
        rejected users
      </h3>
      {rejected.map((rejectUser) => (
        <SingleEmployee employee={rejectUser} />
      ))}
    </div>
  );
};

export default Rejected;
