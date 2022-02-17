import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import useStore from "../../../hooks/useStore";
import UpdateProfile from "../UpdateProfile/UpdateProfile";
import "./ProfileHome.css";

const ProfileHome = () => {
  const { user } = useStore();
  const [updateShow, setUpdateShow] = useState(false);

  if (!user.email) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="container mx-auto px-4 profile-home-container">
      <h1 className="text-center uppercase text-5xl font-bold my-3 py-3 border-4 hover:bg-gray-400">
        Profile
      </h1>
      <div className="cover">
        <img
          // src="https://japandesk.basis.org.bd/public/storage/upload/comapny_logo/xPmNR8MQ0CFHBbzZJVtBa6b8eLFQ2ZkXgApb4jLE.jpeg"
          alt=""
          className="w-full h-80 border-4 border-dashed relative bg-black"
        />
        <div className="profile-photo-container">
          <img className="m-0 user-profile-photo" src={user?.photoURL} alt="" />
        </div>
        <img
          className="company-logo"
          src="https://japandesk.basis.org.bd/public/storage/upload/comapny_logo/xPmNR8MQ0CFHBbzZJVtBa6b8eLFQ2ZkXgApb4jLE.jpeg"
          alt=""
        />
      </div>
      <div className="profile-info w-2/3">
        <h1 className="text-4xl my-3">{user?.displayName}</h1>
        <h1>
          <span className="font-bold">Email:</span> {user?.email}
        </h1>
        <h1>
          <span className="font-bold">Employee ID:</span>{" "}
          {user?.employeeInfo?.employeeId}
        </h1>
        <h1>
          <span className="font-bold">Role ID:</span>{" "}
          {user?.employeeInfo?.role?.roleId}
        </h1>
        <h1>
          <span className="font-bold">Role Description:</span>{" "}
          {user?.employeeInfo?.role?.roleDes}
        </h1>
        <h1>
          <span className="font-bold">Salary:</span>{" "}
          {user?.employeeInfo?.salary} TK
        </h1>
        <h1>
          <span className="font-bold">NID:</span> {user?.employeeInfo?.nid}
        </h1>
        <h1>
          <span className="font-bold">Blood Group:</span>{" "}
          {user?.employeeInfo?.bloodGroup}
        </h1>
        <h1>
          <span className="font-bold">Joining Date:</span>{" "}
          {new Date(user?.employeeInfo?.joiningDate).toDateString()}
        </h1>
        <h1>
          <span className="font-bold">Resign Date:</span>{" "}
          {user?.employeeInfo?.resignDate}
        </h1>
        <h1>
          <span className="font-bold">Address:</span>{" "}
          {user?.employeeInfo?.address}
        </h1>
        <h1>
          <span className="font-bold">About Me:</span>{" "}
          {user?.employeeInfo?.about}
        </h1>
      </div>
      <div>
        <button
          onClick={() => setUpdateShow(!updateShow)}
          className="bg-indigo-800 text-white px-3 py-2 my-4 font-bold hover:bg-indigo-600 rounded-md"
        >
          Update profile
        </button>
      </div>
      <div
        className={`${
          updateShow ? "block" : "hidden"
        } update-profile-component`}
      >
        <UpdateProfile setUpdateShow={setUpdateShow} />
      </div>
    </div>
  );
};

export default ProfileHome;
