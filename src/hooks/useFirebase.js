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
  const createUserUsingEmailAndPassword = (email, password, name, navigate) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        if (user.email) {
          saveUser(user.email, name, user.uid);
        }
        updateProfile(auth.currentUser, {
          displayName: name,
        }).then(() => {});
        navigate("/");
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setIsLoading(false));
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
      })
      .finally(() => setIsLoading(false));
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
        setUser(user);
      } else {
        setUser({});
      }
      setIsLoading(false);
    });
    return () => unsubscribed;
  }, [auth]);

  // =============save user to database =============
  const saveUser = (email, displayName, user_id) => {
    const user = {
      email,
      displayName,
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
    error,
    user,
    createUserUsingEmailAndPassword,
    signInUsingEmailAndPassword,
    isLoading,
    logOut,
    loginStatusChange,
  };
};

export default useFirebase;
