import { updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useStore from "../../../hooks/useStore";

const UpdateProfile = ({ setUpdateShow }) => {
  const { user, auth, setUser, token } = useStore();
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const onSubmit = (data) => {
    if (
      (data.address === user.employeeInfo.address &&
        data.about === user.employeeInfo.about &&
        data.name === user.displayName) ||
      (!data.address && !data.about && !data.name)
    ) {
      setUpdateShow(false);
      return;
    }
    const isUserUpdate = window.confirm("Are you sure?");

    if (isUserUpdate) {
      const updateData = {
        displayName: data.name || user.displayName,
        employeeInfo: {
          ...user.employeeInfo,
          address: data.address || user.employeeInfo.address,
          about: data.about || user.employeeInfo.about,
        },
      };
      setLoading(true);
      fetch(`http://localhost:5000/users/${user.uid}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.acknowledged) {
            updateProfile(auth.currentUser, {
              displayName: data.name || user.displayName,
            }).then(() => {
              alert("Update successfully");
              setUser({ ...user, ...updateData });
              setLoading(false);
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
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <label>Name:</label>
          <input
            className="border-2 border-black w-full my-3 p-2 text-2xl rounded-md "
            placeholder="Name"
            defaultValue={user?.displayName}
            {...register("name")}
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
          <button
            type="submit"
            className="bg-indigo-800 text-white px-3 py-2 my-4 font-bold hover:bg-indigo-600 rounded-md"
          >
            {loading ? (
              <svg
                role="status"
                className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            ) : (
              " Update"
            )}
          </button>
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
