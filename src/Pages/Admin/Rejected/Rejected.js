import React, { useEffect, useState } from "react";
import useStore from "../../../hooks/useStore";
import SingleEmployee from "../SingleEmployee/SingleEmployee";

const Rejected = () => {
  const [rejected, setRejected] = useState([]);
  const { token } = useStore();
  useEffect(() => {
    fetch(`http://localhost:5000/user?approveStatus=Reject`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setRejected(data));
  }, [token]);
  return (
    <div>
      <h3 className="text-center font-bold text-4xl border-4 p-3 my-3 uppercase hover:bg-gray-400">
        rejected users
      </h3>
      {rejected.length &&
        rejected.map((rejectUser) => (
          <SingleEmployee key={rejectUser._id} employee={rejectUser} />
        ))}
    </div>
  );
};

export default Rejected;
