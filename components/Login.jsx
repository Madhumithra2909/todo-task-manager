import React, { useEffect, useState } from "react";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../firebase";
import "./Login.scss";

function Login({ setUser }) {
  const [userData, setUserData] = useState(null);

  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUserData(user);
        setUser(user.email);
        localStorage.setItem("todo_user", JSON.stringify(user));
      })
      .catch((err) => console.error(err));
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUserData(null);
        setUser(null);
        localStorage.removeItem("todo_user");
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("todo_user");
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setUserData(parsed);
      setUser(parsed.email);
    }
  }, [setUser]);

  return (
    <div className="login-wrapper">
      {!userData ? (
        <div className="login-card">
          <div className="login-logo">
    
            <span className="login-title">ToDo App</span>
          </div>
      


          <h1>Welcome to Todo Pro</h1>
          <p>Organize your day. Conquer your goals.</p>
          <button className="google-btn" onClick={handleLogin}>
            Sign in with Google
          </button>
        </div>
      ) : (
        <div className="login-card">
          <p>Welcome, {userData.displayName}</p>
          <img
            src={userData.photoURL}
            alt="profile"
            style={{ width: 60, borderRadius: "50%" }}
          />
          <button className="google-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Login;
