import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import useStore from "../../hooks/useStore";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { auth } = useStore();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      return;
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setMessage("Email send successfully");
        setEmail("");
      })
      .catch((error) => {
        setError(error.message);
        setMessage(error.message);
        setEmail("");
      });
  };
  return (
    <div className="m-10 flex justify-center items-center">
      <div className="lg:w-1/2">
        {!email ? (
          <p
            className={`my-3  font-bold ${
              error ? "text-red-700" : "text-green-700"
            }`}
          >
            {message}
          </p>
        ) : (
          <div className="my-3"></div>
        )}
        <form onSubmit={handleSubmit} className="w-full">
          <label>Enter your email</label>
          <br />
          <input
            type="email"
            className=" border border-black w-full p-3"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setMessage("");
            }}
          />
          <br />
          <button
            className="bg-indigo-700 my-5 text-white font-bold p-3 hover:bg-indigo-500"
            type="submit"
          >
            Send password reset email
          </button>
        </form>
        <Link className=" underline text-blue-800 my-3 p-2" to="/login">
          &lt; Back to login
        </Link>
      </div>
    </div>
  );
};

export default ResetPassword;
