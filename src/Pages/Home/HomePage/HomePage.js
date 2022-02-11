import React from "react";
import useStore from "../../../hooks/useStore";

const HomePage = () => {
  const { logOut } = useStore();
  return (
    <div>
      <h2>This is home page</h2>
      <button onClick={logOut}>log out</button>
    </div>
  );
};

export default HomePage;
