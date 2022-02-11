import { useEffect, useState } from "react";

const useData = () => {
  const [employees, setEmployees] = useState([]);
  // get all employees
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setEmployees(data));
  }, []);

  // get login employees
  useEffect(() => {
    fetch(`http://localhost:5000/user?isLogin=${true}`)
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);
  return { employees };
};

export default useData;
