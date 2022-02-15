import { updateProfile } from "firebase/auth";
import React from "react";
import { useForm } from "react-hook-form";
import useStore from "../../../hooks/useStore";

const UpdateProfile = ({ setUpdateShow }) => {
  const { user, auth, setUser } = useStore();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    if (
      (data.photoURL === user.photoURL &&
        data.address === user.employeeInfo.address &&
        data.about === user.employeeInfo.about) ||
      (!data.photoURL && !data.address && !data.about)
    ) {
      setUpdateShow(false);
      return;
    }
    const isUserUpdate = window.confirm("Are you sure?");
    const updateData = {
      displayName: data.name || user.displayName,
      employeeInfo: {
        ...user.employeeInfo,
        photoURL: data.photoURL || user.photoURL,
        address: data.address || user.employeeInfo.address,
        about: data.about || user.employeeInfo.about,
      },
    };
    if (isUserUpdate) {
      fetch(`http://localhost:5000/users/${user.user_id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(updateData),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.acknowledged) {
            updateProfile(auth.currentUser, {
              displayName: data.name || user.displayName,
              photoURL: data.photoURL || user.photoURL,
            }).then(() => {
              alert("Update successfully");
              setUser({ ...user, ...updateData });
              setUpdateShow(false);
            });
          }
        });
    }
  };
  return (
    <div>
      <h1 className="uppercase text-4xl font-bold text-center p-3 my-3 border-4 hover:bg-gray-400">
        Update Profile
      </h1>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Name:</label>
          <input
            className="border-2 border-black w-full my-3 p-2 text-2xl rounded-md "
            placeholder="Name"
            defaultValue={user?.displayName}
            {...register("name")}
          />
          <br />
          <label>Photo URL:</label>
          <input
            className="border-2 border-black w-full my-3 p-2 text-2xl rounded-md "
            defaultValue={user?.photoURL}
            {...register("photoURL")}
          />
          <br />
          <label>Address:</label>
          <input
            className="border-2 border-black w-full my-3 p-2 text-2xl rounded-md "
            defaultValue={user?.employeeInfo?.address}
            {...register("address")}
          />

          <br />
          <label>About:</label>
          <textarea
            rows={5}
            className="border-2 border-black w-full my-3 p-2 text-2xl rounded-md "
            defaultValue={user?.employeeInfo?.about}
            {...register("about")}
          />

          <br />
          <input
            type="submit"
            value="Update"
            className="bg-indigo-800 text-white px-3 py-2 my-4 font-bold hover:bg-indigo-600 rounded-md"
          />
        </form>
        <button
          onClick={() => setUpdateShow(false)}
          className="absolute top-0 right-0 bg-red-900 text-white font-bold px-3 py-2 hover:bg-red-600 "
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default UpdateProfile;
