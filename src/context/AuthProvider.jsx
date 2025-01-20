import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import AuthContext from "./AuthContex";
import { auth } from "../firebase/firebase.init";
// import useAxiosPublic from "../Hook/useAxiosPublic";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const GoogleProvider = new GoogleAuthProvider();
  //   const axiosPublic = useAxiosPublic();

  //createUserWithEmailAndPassword
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //   Sign in a user with email and password
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // sign in a user with Google
  const signInGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, GoogleProvider);
  };

  //   signOut user
  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  // updateProfile
  const updateUserProfile = (name, photoLink) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoLink,
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      //   //   ...................................................>
      //   // console.log("Current User======>", currentUser);
      //   if (currentUser) {
      //     //get token and store
      //     const userInfo = { email: currentUser.email };
      //     // axiosPublic : because every login users get token after login immediately
      //     axiosPublic.post("/jwt", userInfo).then((res) => {
      //       if (res.data.token) {
      //         localStorage.setItem("access-token", res.data.token);
      //       }
      //     });
      //   } else {
      //     //remove token(if token stored in the clinets side: Local storage, caching, in memory)
      //     localStorage.removeItem("access-token");
      //   }
      //   //   ...................................................>

      setLoading(false);
    });
    return () => {
      return unsubscribe();
    };
  }, []); //[axiosPublic]

  const authInfo = {
    user,
    loading,
    createUser,
    signInUser,
    signInGoogle,
    signOutUser,
    updateUserProfile,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
