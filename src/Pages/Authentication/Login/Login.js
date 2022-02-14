import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import useStore from "../../../hooks/useStore";

const Login = () => {
  const {
    createUserUsingEmailAndPassword,
    signInUsingEmailAndPassword,
    error,
  } = useStore();
  const [isRegister, setIsRegister] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    if (!data.email) {
      alert("Empty field");
      return;
    }
    const employeeInfo = {
      photoURL: data.photoURL,
      role: {
        roleId: data.roleId,
        roleDes: data.roleDes,
      },
      employeeId: data.employeeId,
      about: data.about,
      joiningDate: data.joiningDate,
      resignDate: data.resignDate || "Present",
      salary: data.salary,
      address: data.address,
      bloodGroup: data.bloodGroup,
      nid: data.nid,
    };
    if (isRegister) {
      console.log(data);
      createUserUsingEmailAndPassword(
        data.email,
        data.password,
        data.name,
        employeeInfo,
        navigate
      );
    } else {
      signInUsingEmailAndPassword(data.email, data.password, navigate, from);
    }
  };
  return (
    <>
      <div className="py-5 mx-2">
        <div className="lg:w-1/3 m-auto">
          <h1 className="text-4xl text-center font-bold uppercase">
            {isRegister ? "Register" : "Login"}
          </h1>
          {error && <p className="text-center text-red-600 my-8">{error}</p>}
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>Email:</label>
            <input
              className="border-2 border-black w-full my-3 p-2 text-2xl rounded-md"
              placeholder="Enter your email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-500">This field is required</span>
            )}
            <br />
            {isRegister && (
              <>
                <label>Name:</label>
                <input
                  className="border-2 border-black w-full my-3 p-2 text-2xl rounded-md"
                  placeholder="Your Name"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <span className="text-red-500">This field is required</span>
                )}
                <br />
                <label>Photo Url:</label>
                <input
                  className="border-2 border-black w-full my-3 p-2 text-2xl rounded-md"
                  placeholder="Photo URL"
                  {...register("photoURL", { required: true })}
                />
                {errors.photoURL && (
                  <span className="text-red-500">This field is required</span>
                )}
                <br />
                <label>Role Id:</label>
                <input
                  className="border-2 border-black w-full my-3 p-2 text-2xl rounded-md"
                  placeholder="Role ID"
                  {...register("roleId", { required: true })}
                />
                {errors.roleId && (
                  <span className="text-red-500">This field is required</span>
                )}
                <br />
                <label>Role Description:</label>
                <input
                  className="border-2 border-black w-full my-3 p-2 text-2xl rounded-md"
                  placeholder="Role Description"
                  {...register("roleDes", { required: true })}
                />
                {errors.roleDes && (
                  <span className="text-red-500">This field is required</span>
                )}
                <br />
                <label>Employee ID:</label>
                <input
                  className="border-2 border-black w-full my-3 p-2 text-2xl rounded-md"
                  placeholder="Employee ID"
                  {...register("employeeId", { required: true })}
                />
                {errors.employeeId && (
                  <span className="text-red-500">This field is required</span>
                )}
                <br />
                <label>About:</label>
                <textarea
                  rows={4}
                  className="border-2 border-black w-full my-3 p-2 text-2xl rounded-md"
                  placeholder="About"
                  {...register("about", { required: true })}
                />
                {errors.about && (
                  <span className="text-red-500">This field is required</span>
                )}
                <br />
                <label>Joining Date:</label>
                <input
                  className="border-2 border-black w-full my-3 p-2 text-2xl rounded-md"
                  placeholder="Joining Date"
                  type="date"
                  {...register("joiningDate", { required: true })}
                />
                {errors.joiningDate && (
                  <span className="text-red-500">This field is required</span>
                )}
                <br />
                <label>Resign Date:</label>
                <input
                  className="border-2 border-black w-full my-3 p-2 text-2xl rounded-md"
                  placeholder="Resign Date"
                  type="date"
                  {...register("resignDate")}
                />
                <br />
                <label>Salary:</label>
                <input
                  className="border-2 border-black w-full my-3 p-2 text-2xl rounded-md"
                  placeholder="Salary"
                  type="number"
                  {...register("salary", { required: true })}
                />
                {errors.salary && (
                  <span className="text-red-500">This field is required</span>
                )}
                <br />
                <label>Address:</label>
                <input
                  className="border-2 border-black w-full my-3 p-2 text-2xl rounded-md"
                  placeholder="Address"
                  {...register("address", { required: true })}
                />
                {errors.address && (
                  <span className="text-red-500">This field is required</span>
                )}
                <br />
                <label>Blood Group</label>
                <input
                  className="border-2 border-black w-full my-3 p-2 text-2xl rounded-md"
                  placeholder="Blood Group"
                  {...register("bloodGroup", { required: true })}
                />
                {errors.bloodGroup && (
                  <span className="text-red-500">This field is required</span>
                )}
                <br />
                <label>NID:</label>
                <input
                  className="border-2 border-black w-full my-3 p-2 text-2xl rounded-md"
                  placeholder="NID"
                  type="number"
                  {...register("nid", { required: true })}
                />
                {errors.nid && (
                  <span className="text-red-500">This field is required</span>
                )}
                <br />
              </>
            )}
            <label>Password:</label>
            <input
              className="border-2 border-black w-full my-3 p-2 text-2xl rounded-md"
              placeholder="Your Password"
              type="password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-red-500">This field is required</span>
            )}
            <br />
            {isRegister ? (
              <input
                className="bg-sky-900 px-3 py-2 text-white rounded cursor-pointer"
                type="submit"
                value="Register"
              />
            ) : (
              <input
                className="bg-sky-900 px-3 py-2 text-white rounded cursor-pointer"
                type="submit"
                value="Login"
              />
            )}
          </form>
          {isRegister ? (
            <h1 className="text-xl my-3">
              Already register?{" "}
              <span
                className="text-sky-800 cursor-pointer"
                onClick={() => setIsRegister(false)}
              >
                Login here
              </span>
            </h1>
          ) : (
            <h1 className="text-xl my-3">
              New user?{" "}
              <span
                className="text-sky-800 cursor-pointer"
                onClick={() => setIsRegister(true)}
              >
                Signup here
              </span>
            </h1>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
