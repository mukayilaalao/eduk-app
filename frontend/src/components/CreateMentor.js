import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import GeneralShowMessage from "./GeneralShowMessage";
import "../css/createMentor.css";

const API = process.env.REACT_APP_API_URL;

function CreateMentor() {
  let navigate = useNavigate();
  const [mentor, setMentor] = useState({
    mentor_fname: "",
    mentor_lname: "",
    bio: "",
    email: "",
    speciality: "",
  });
  const [open, setOpen] = useState(false);

  const addMentor = () => {
    if (
      !(
        mentor.mentor_fname &&
        mentor.mentor_lname &&
        mentor.bio &&
        mentor.email &&
        mentor.speciality
      )
    ) {
      setOpen(true);
      return;
    }
    axios
      .post(`${API}/mentors`, mentor)
      .then(() => {
        alert(
          "Thank you for signing up. We'll send you an invite to get started soon!"
        );
        navigate(`/`);
      })
      .catch((c) => console.warn("catch", c));
  };

  const handleTextChange = (event) => {
    setMentor({ ...mentor, [event.target.id]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addMentor();
  };
  //close the message bar function
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div className="create-mentor-form">
      <GeneralShowMessage
        message="Please fill out the mentor's form correctly, thank you!"
        open={open}
        handleClose={handleClose}
        severity="warning"
      />
      <h2>Let's create your account!</h2>
      <div className="subHeaderResources">Become a Mentor at EDUK!</div>
      <form className="mentor-form" onSubmit={handleSubmit}>
        <label htmlFor="firstname">First Name</label>
        <input
          id="mentor_fname"
          className="input"
          type="text"
          value={mentor.mentor_fname}
          // placeholder="Please Enter First Name"
          onChange={handleTextChange}
        />

        <label htmlFor="lastname">Last Name</label>
        <input
          id="mentor_lname"
          className="input"
          type="text"
          onChange={handleTextChange}
          value={mentor.mentor_lname}
          // placeholder="Please Enter Last Name"
        />

        <label htmlFor="speciality">Speciality</label>
        <input
          id="speciality"
          className="input"
          type="text"
          onChange={handleTextChange}
          value={mentor.speciality}
          // placeholder="Please Enter Speciality"
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          className="input"
          type="text"
          onChange={handleTextChange}
          value={mentor.email}
          // placeholder="Please Enter Email Address"
        />

        <label htmlFor="bio">Bio</label>
        <textarea
          id="bio"
          className="input"
          type="text"
          onChange={handleTextChange}
          value={mentor.bio}
          // placeholder="Please Enter Bio"
        />
        <button type="submit" className="create-mentor-submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateMentor;
