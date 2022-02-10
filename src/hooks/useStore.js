import { useContext } from "react";
import { Context } from "../context/Provider";

const useStore = () => {
  return useContext(Context);
};

export default useStore;
