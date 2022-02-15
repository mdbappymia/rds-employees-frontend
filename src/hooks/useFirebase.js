import { useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import initializeAuthentication from "../Pages/Authentication/Firebase/firebase.init";

initializeAuthentication();

const useFirebase = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  console.log(user);
  const auth = getAuth();
  // ========= Create a user =========
  const createUserUsingEmailAndPassword = (
    email,
    password,
    name,
    employeeInfo,
    navigate
  ) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        if (user.email) {
          saveUser(user.email, name, user.uid, employeeInfo);
        }
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: employeeInfo.photoURL,
        }).then(() => {
          setUser({
            ...user,
            photoURL: employeeInfo.photoURL,
            employeeInfo: employeeInfo,
          });
          navigate("/");
        });
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  //   ========= Sign in user ==========
  const signInUsingEmailAndPassword = (email, password, navigate, from) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        loginStatusChange(userCredential.user.uid, { isLogin: "true" });
        navigate(from);
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  // ============= Sign Out ===================
  const logOut = () => {
    const uid = user.uid;
    signOut(auth)
      .then(() => {
        loginStatusChange(uid, { isLogin: "false" });
        console.log("logout");
      })
      .catch((error) => {
        // An error happened.
      });
  };
  // ===========Initially user login check==============
  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetch(`http://localhost:5000/users/${user.uid}`)
          .then((res) => res.json())
          .then((data) => {
            setUser({ ...user, ...data });
            setIsLoading(false);
          });
      } else {
        setUser({});
      }
    });
    return () => unsubscribed();
  }, [auth]);
  console.log(user);
  // =============save user to database =============
  const saveUser = (email, displayName, user_id, employeeInfo) => {
    const user = {
      email,
      displayName,
      employeeInfo,
      user_id,
      role: "User",
      isLogin: "true",
      approveStatus: "Pending",
    };
    fetch("http://localhost:5000/users", {
      method: `POST`,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
  // ===============Login Status Change==============
  const loginStatusChange = (uid, data) => {
    fetch(`http://localhost:5000/users/${uid}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };
  // =============Return all usable part ==============
  return {
    auth,
    error,
    user,
    setUser,
    createUserUsingEmailAndPassword,
    signInUsingEmailAndPassword,
    isLoading,
    logOut,
    loginStatusChange,
  };
};

export default useFirebase;
