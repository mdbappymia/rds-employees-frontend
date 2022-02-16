import { useEffect, useState } from "react";
import useFirebase from "./useFirebase";

const useData = () => {
  const [employees, setEmployees] = useState([]);
  const { token } = useFirebase();
  const useToken = token;
  // localStorage.getItem("token") ||
  // get all employees
  useEffect(() => {
    fetch("http://localhost:5000/users", {
      headers: {
        authorization: `Bearer ${useToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setEmployees(data));
  }, [useToken, token]);

  return { employees, setEmployees };
};

export default useData;
