import { useEffect, useState } from "react";

const useData = () => {
  const [employees, setEmployees] = useState([]);
  // get all employees
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setEmployees(data));
  }, []);

  return { employees, setEmployees };
};

export default useData;
