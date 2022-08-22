import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import "../css/LogIn.css";
import { Link } from "react-router-dom";
import GeneralShowMessage from "./GeneralShowMessage";

const API = process.env.REACT_APP_API_URL;

function LogInUser({ setLogText, mentors, setUserInfo }) {
  let navigate = useNavigate();
  const [user, setUser] = useState({
    user_name: "",
    password: "",
  });
  //show error to user
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const logIn = () => {
    setError("");
    axios
      .post(`${API}/auth/login`, user, { withCredentials: true })
      .then((res) => {
        const userId = res.data.result.userId;
        setLogText("Log Out");
        setUserInfo(res.data.result);
        navigate(`/users/${userId}`);
      })
      .catch((c) => {
        // console.log(c);
        setError("Unauthorized, wrong username or password.");
        setOpen(true);
      });
  };

  const handleChange = (event) => {
    setUser({ ...user, [event.target.id]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    logIn();
  };

  //message

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div className="user-login-form">
      <GeneralShowMessage
        severity="error"
        message={error}
        open={open}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        handleClose={handleClose}
      />
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login Here</h2>
        <input
          placeholder="Username"
          type="text"
          id="user_name"
          onChange={handleChange}
          value={user.user_name}
        />
        <input
          placeholder="Password"
          type="password"
          id="password"
          onChange={handleChange}
          value={user.password}
        />

        <button className="login-submit">Log In</button>
        <div style={{ fontSize: "20px", fontWeight: "600" }}>
          NEW TO EDUK ? &nbsp;
          <Link style={{ color: "blue", fontSize: "15px" }} to="/users/create">
            Sign up here !!
          </Link>
        </div>
      </form>
    </div>
  );
}
export default LogInUser;
