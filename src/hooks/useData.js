import { useEffect, useState } from "react";
import useFirebase from "./useFirebase";

const useData = () => {
  const [employees, setEmployees] = useState([]);
  const [pendingEmployees, setPendingEmployees] = useState([]);
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

  useEffect(() => {
    fetch(`http://localhost:5000/user?approveStatus=Pending`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setPendingEmployees(data));
  }, [token]);

  const [loggedInEmployees, setLoggedInEmployees] = useState([]);
  // get login employees
  useEffect(() => {
    fetch(`http://localhost:5000/user?isLogin=${true}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setLoggedInEmployees(data));
  }, [token]);

  const [rejected, setRejected] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/user?approveStatus=Reject`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setRejected(data));
  }, [token]);
  return {
    employees,
    setEmployees,
    pendingEmployees,
    setPendingEmployees,
    loggedInEmployees,
    rejected,
    setRejected,
  };
};

export default useData;
