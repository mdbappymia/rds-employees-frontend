import { useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
  getIdToken,
  updateEmail,
} from "firebase/auth";
import initializeAuthentication from "../Pages/Authentication/Firebase/firebase.init";

initializeAuthentication();

const useFirebase = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState("");
  const [userReload, setUserReload] = useState(false);
  const auth = getAuth();

  // ========= Create a user =========
  const createUserUsingEmailAndPassword = (
    email,
    password,
    name,
    formData,
    navigate
  ) => {
    // saveUser(user.email, name, user.uid,  formData);
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        if (user.email) {
          formData.append("user_id", user.uid);
          saveUser(formData);
        }
        updateProfile(auth.currentUser, {
          displayName: name,
        }).then(() => {
          navigate("/");
        });
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
        fetch(`http://localhost:5000/users/${user.uid}`)
          .then((res) => res.json())
          .then((data) => {
            setUser({ ...user, ...data });
            getIdToken(user).then((idToken) => {
              setToken(idToken);
              // localStorage.setItem("token", idToken);
            });
            setError("");
          })
          .finally(() => setIsLoading(false));
      } else {
        setUser({});
        setIsLoading(false);
      }
    });
    return () => unsubscribed();
  }, [auth, userReload]);

  // =============save user to database =============
  const saveUser = (formData) => {
    fetch("http://localhost:5000/users", {
      method: `POST`,
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          setUserReload(!userReload);
        }
      });
  };

  // ===============Login Status Change==============
  const loginStatusChange = (uid, data) => {
    fetch(`http://localhost:5000/users/${uid}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  };
  // =============Return all usable part ==============
  return {
    auth,
    error,
    user,
    token,
    setUser,
    createUserUsingEmailAndPassword,
    signInUsingEmailAndPassword,
    updateEmail,
    isLoading,
    logOut,
    loginStatusChange,
    userReload,
    setUserReload,
  };
};

export default useFirebase;
