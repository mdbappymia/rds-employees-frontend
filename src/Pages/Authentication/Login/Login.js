import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import useStore from "../../../hooks/useStore";

const Login = () => {
  const {
    createUserUsingEmailAndPassword,
    signInUsingEmailAndPassword,
    error,
    isLoading,
    user,
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

    if (isRegister) {
      const employeeInfo = {
        photoURL: data.photoURL,
        role: {
          roleId: data.roleId,
          roleDes: "",
        },
        employeeId: "",
        about: "",
        joiningDate: "",
        resignDate: "",
        salary: "",
        address: "",
        bloodGroup: "",
        nid: "",
      };
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
  if (isLoading) {
    return (
      <div className="h-85vh flex items-center justify-center text-7xl">
        <svg
          role="status"
          className="mr-2 w-20 h-20 inline  text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
      </div>
    );
  }
  if (user.email) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <div className="py-5 mx-2 h-85vh flex justify-center items-center">
        <div className="lg:w-1/3 m-auto">
          <h1 className="text-4xl text-center font-bold uppercase">
            {isRegister ? "Register" : "Login"}
          </h1>
          {error && <p className="text-center text-red-600 my-8">{error}</p>}
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>Email: *</label>
            <input
              autoComplete="off"
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
                <label>Name: *</label>
                <input
                  className="border-2 border-black w-full my-3 p-2 text-2xl rounded-md"
                  placeholder="Your Name"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <span className="text-red-500">This field is required</span>
                )}
                <br />
                <label>Photo Url: *</label>
                <input
                  className="border-2 border-black w-full my-3 p-2 text-2xl rounded-md"
                  placeholder="Photo URL"
                  {...register("photoURL", { required: true })}
                />
                {errors.photoURL && (
                  <span className="text-red-500">This field is required</span>
                )}
                <br />
                <label>Role Id: *</label>
                <input
                  className="border-2 border-black w-full my-3 p-2 text-2xl rounded-md"
                  placeholder="Role ID"
                  {...register("roleId", { required: true })}
                />
                {errors.roleId && (
                  <span className="text-red-500">This field is required</span>
                )}
                <br />
              </>
            )}
            <label>Password: *</label>
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
