import { updateEmail } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import useStore from "../../../hooks/useStore";
import UpdateProfile from "../UpdateProfile/UpdateProfile";
import "./ProfileHome.css";

const ProfileHome = () => {
  const { user, isLoading, setUserReload, userReload, auth, token } =
    useStore();
  const [updateShow, setUpdateShow] = useState(false);
  const [uploadInputShow, setUploadInputShow] = useState(false);
  const [isUpdateEmail, setIsUpdateEmail] = useState(false);
  const [updateEmailText, setUpdateEmailText] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);

  const [roleDes, setRoleDes] = useState("");
  useEffect(() => {
    fetch(`http://localhost:5000/roles/${user.employeeInfo?.roleId}`)
      .then((res) => res.json())
      .then((data) => {
        setRoleDes(data.roleDes);
      });
  }, [user.employeeInfo?.roleId]);

  if (!isLoading && !user.email) {
    return <Navigate to="/login" />;
  }
  const handleProfileImageChange = () => {
    if (!uploadedImage) {
      setUploadInputShow(false);
      return;
    }
    const formData = new FormData();
    formData.append("profileImage", uploadedImage);
    fetch(`http://localhost:5000/updateProfilePicture/${user.user_id}`, {
      method: "PUT",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.acknowledged) {
          alert("Update successfully");
          setUploadInputShow(false);
          setUploadedImage(null);
          setUserReload(!userReload);
        }
      });
  };
  const handleEmailUpdate = () => {
    if (updateEmailText === "") {
      setIsUpdateEmail(false);
      return;
    }
    const isSubmit = window.confirm("Are you sure?");
    if (isSubmit) {
      updateEmail(auth.currentUser, updateEmailText)
        .then(() => {
          fetch(`http://localhost:5000/users/${user.uid}`, {
            method: "PUT",
            headers: {
              "content-type": "application/json",
              authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ email: updateEmailText }),
          })
            .then((res) => res.json())
            .then((result) => {
              if (result.acknowledged) {
                alert("Email Change Successfully");
                setIsUpdateEmail(false);
                setUpdateEmailText("");
              }
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <div className="container mx-auto px-4 profile-home-container">
      <h1 className="text-center text-4xl font-bold my-3 p-3 uppercase border-4 hover:bg-gray-300">
        Profile
      </h1>
      <div className="container px-4 mx-auto">
        <div className="wrapper lg:grid">
          <div className="left">
            <div className="relative mx-auto lg:w-2/3 profile-image-div ">
              <img
                className=" rounded-full profile-image bg-amber-300"
                src={`data:image/jpeg;base64,${user.profileImage}`}
                alt="user"
              />
              <div className="absolute top-10 bg-black text-left">
                <button
                  className="bg-indigo-600 pen-icon"
                  onClick={() => setUploadInputShow(!uploadInputShow)}
                >
                  {uploadInputShow ? (
                    <p className="bg-red-500 px-3 pb-2 m-0">&times;</p>
                  ) : (
                    <i className="fa fa-pen px-3 pb-2 m-0 "></i>
                  )}
                </button>
                <div className={`${uploadInputShow ? "block" : "hidden"}`}>
                  <input
                    onChange={(e) => setUploadedImage(e.target.files[0])}
                    type="file"
                    className="mt-2"
                  />
                  <button
                    onClick={handleProfileImageChange}
                    className="p-2 bg-green-600 my-2"
                  >
                    Upload
                  </button>
                </div>
              </div>
            </div>
            <div className="basic_info">
              <h3>{user?.displayName}</h3>
              <span className="address">
                {user?.employeeInfo?.address || "empty"}
              </span>
            </div>
            <div className="contact-me text-white text-left ml-10 font-bold text-lg">
              <span>Contact</span>
            </div>
            <div className="flex email-container">
              <h4 className="text-gray-300">{user?.email}</h4>
              <div
                onClick={() => setIsUpdateEmail(!isUpdateEmail)}
                className="hidden email-update-pen"
              >
                <i className="fa fa-pen px-3 pb-2 m-0"></i>
              </div>
              {isUpdateEmail && (
                <div className="absolute bg-white px-4 rounded-xl">
                  <input
                    className="text-black p-2 "
                    defaultValue={updateEmailText || user.email}
                    onChange={(e) => setUpdateEmailText(e.target.value)}
                    placeholder="example@email.com"
                    type="email"
                  />{" "}
                  <button
                    onClick={handleEmailUpdate}
                    className="bg-indigo-500 hover:bg-indigo-800 p-2"
                  >
                    update
                  </button>
                  <span
                    onClick={() => setIsUpdateEmail(false)}
                    className="bg-red-500 ml-3 px-2 cursor-pointer"
                  >
                    &times;
                  </span>
                </div>
              )}
            </div>
            <div>
              <button
                onClick={() => setUpdateShow(!updateShow)}
                className="bg-indigo-800 text-white px-3 py-2 my-4 font-bold hover:bg-indigo-600 rounded-md"
              >
                Update profile
              </button>
            </div>
          </div>

          <div className="right">
            <div className="info">
              <h3>Personal Information</h3>
              <div className="info_data">
                <div className="data">
                  <h4>NID:</h4>
                  <p>{user?.employeeInfo?.nid || "empty"}</p>
                </div>
                <div className="data">
                  <h4>Blood Group</h4>
                  <p>{user?.employeeInfo?.bloodGroup || "empty"}</p>
                </div>
                <div className="data">
                  <h4>About Me</h4>
                  <p>{user?.employeeInfo?.about || "empty"}</p>
                </div>
              </div>
            </div>

            <div className="projects">
              <h3>Work Information</h3>
              <div className="projects_data">
                <div className="data">
                  <h4>Employee ID</h4>
                  <p>{user?.employeeInfo?.employeeId}</p>
                </div>
                <div className="data">
                  <h4>Role Description</h4>
                  <p>{roleDes || "empty"}</p>
                </div>
                <div className="data">
                  <h4>Joining Date</h4>
                  <p>
                    {new Date(user?.employeeInfo?.joiningDate).toDateString() ||
                      "empty"}
                  </p>
                </div>
                <div className="data">
                  <h4>Salary</h4>
                  <p>BDT {user?.employeeInfo?.salary || "empty"} only</p>
                </div>
                <div className="data">
                  <h4>Resigning Date</h4>
                  <p>
                    {typeof user?.employeeInfo?.resignDate === typeof ""
                      ? "Present"
                      : new Date(
                          user?.employeeInfo?.resignDate
                        ).toDateString() || "empty"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`${
            updateShow ? "block" : "hidden"
          } update-profile-component`}
        >
          <UpdateProfile setUpdateShow={setUpdateShow} />
        </div>
      </div>
    </div>
  );
};

export default ProfileHome;
