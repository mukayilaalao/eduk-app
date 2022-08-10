import React from "react";
import Dropdown from "./Dropdown";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import Button from "@mui/material/Button";
import styled from "styled-components";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import axios from "axios";

const Ul = styled.ul`
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: rgb(247 247 247);
    position: fixed;
    transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
    top: 25px;
    right: 0;
    height: 100vh;
    width: 240px;
    padding-top: 3.5rem;
    transition: 0.3s ease-in-out;
    z-index: 20;
  }
`;

const API = process.env.REACT_APP_API_URL;
export default function RightNav({
  open,
  setOpen,
  logText,
  setLogText,
  click,
  handleClick,
  toggleDropdownOpen,
  toggleOpen,
  dropdown,
  onMouseClick,
  onMouseUnclick,
  userInfo,
  setUserInfo,
}) {
  const navigate = useNavigate();

  //log out the user
  const logOut = () => {
    axios
      .get(`${API}/auth/logout`, { withCredentials: true })
      .then(() => {
        console.log("run logout func");
        setLogText("Log In");
        setUserInfo({ ...userInfo, isLogin: false });
        navigate("/");
      })
      .catch((e) => console.log(e));
  };

  return (
    <Ul open={open} className="navLinks">
      <li
        className="eachLi mainLi "
        onClick={dropdown ? onMouseUnclick : onMouseClick}
      >
        <Link to="/resources">
          Resources <ArrowDropDownIcon fontSize="small"></ArrowDropDownIcon>
        </Link>
        {dropdown && (
          <Dropdown
            handleClick={handleClick}
            click={click}
            open={open}
            toggleOpen={toggleOpen}
            toggleDropdownOpen={toggleDropdownOpen}
            setOpen={setOpen}
          />
        )}
      </li>
      <li
        onClick={() => {
          toggleOpen();
          toggleDropdownOpen();
        }}
        className="eachLi mainLi"
      >
        <Link to="/about">About</Link>
      </li>

      {!Object.keys(userInfo).length ? (
        ""
      ) : userInfo.isAdmin ? (
        <li
          onClick={() => {
            toggleOpen();
            toggleDropdownOpen();
          }}
          className="eachLi mainLi"
        >
          <Link to="admin">Admin Page</Link>
        </li>
      ) : (
        <li
          onClick={() => {
            toggleOpen();
            toggleDropdownOpen();
          }}
          className="eachLi mainLi"
        >
          <Link to={`/users/${userInfo.userId}`}>Dashboard</Link>
        </li>
      )}

      <li
        onClick={() => {
          toggleOpen();
          toggleDropdownOpen();
        }}
        className="eachLi mainLi"
      >
        {userInfo.isLogin ? (
          <Link to="/mentors">Mentors</Link>
        ) : (
          <Link to="/mentors/create">Mentors</Link>
        )}
      </li>
      <div
        onClick={() => {
          toggleOpen();
          toggleDropdownOpen();
        }}
        className="loginIcon"
      >
        {userInfo.isLogin ? (
          <Button variant="outlined" size="medium" onClick={logOut}>
            {logText}
          </Button>
        ) : (
          <Link to="/users/login">
            <Button
              variant="contained"
              size="medium"
              style={{
                background_color: "rgb(22 38 85)",
                fontSize: "18px",
              }}
            >
              {logText}
            </Button>
          </Link>
        )}
      </div>
    </Ul>
  );
}
