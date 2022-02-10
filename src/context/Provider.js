import React, { createContext } from "react";
import useData from "../hooks/useData";
import useFirebase from "../hooks/useFirebase";

export const Context = createContext();

const Provider = ({ children }) => {
  const authContext = useFirebase();
  const dataContext = useData();
  return (
    <Context.Provider value={{ ...authContext, ...dataContext }}>
      {children}
    </Context.Provider>
  );
};

export default Provider;
