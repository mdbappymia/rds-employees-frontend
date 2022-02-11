import React from "react";
import useStore from "../../../hooks/useStore";

const HomePage = () => {
  const { logOut, user } = useStore();
  return (
    <div>
      <h2>This is home page</h2>
      {user.email && <button onClick={logOut}>log out</button>}
    </div>
  );
};

export default HomePage;
