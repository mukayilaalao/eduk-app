import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
//STYLING

import NavBar from "./components/NavBar";
// import Footer from "./components/Footer";
//AXIOS
import axios from "axios";
// IMPORTING PAGES

import Home from "./pages/Home";
import About from "./pages/About";
import ResourcesPage from "./pages/ResourcesPage";
import UserPortal from "./pages/UserPortal";
//resources usage page
import ResourcesUsagePage from "./pages/ResourcesUsage";
import ShowResource from "./pages/ShowResource";
import UsersPortal from "./pages/UsersPortal";
import LogInUser from "./components/LogInUser";
import NewMentor from "./pages/NewMentor";
import MentorsPage from "./pages/MentorsPage";
import Uploader from "./pages/Uploader";
import "bootstrap/dist/css/bootstrap.min.css";

// rescources pages
import HighschoolPage from "./pages/HighschoolPage";
import CollegePage from "./pages/CollegePage";
import ContinuedLearningPage from "./pages/ContinuedLearningPage";

//Shows a single resource
//import ShowResource from "./pages/ShowResource";
import CreateUser from "./components/CreateUser";

import Pendings from "./pages/Pendings";
import NewResource from "./pages/NewResource";
import AdminPage from "./pages/AdminPage";

import Footer from "./components/Footer";
//API
const API = process.env.REACT_APP_API_URL;
function App() {
  //owners photo update state
  //   const [owner, setOwner] = useState({});
  //mentors info
  const [mentors, setMentors] = useState([]);
  //track user login logout
  const [userInfo, setUserInfo] = useState({});
  const [logText, setLogText] = useState("LOG IN");

  useEffect(() => {
    axios
      .get(API + "/mentors")
      .then((response) => {
        const mentors = response.data.result.filter(
          (mentor) => mentor.is_verified
        );
        setMentors(mentors);
      })
      .catch((error) => {
        console.log(error);
      });

    //keep user login
    axios
      .get(API + "/auth/login")
      .then((res) => {
        setUserInfo({ ...userInfo, isLogin: true });
        setLogText("LOG OUT");
      })
      .catch((e) => {
        setUserInfo({ ...userInfo, isLogin: false });
        setLogText("LOG IN");
      });
  }, []);

  return (
    <div className="App">
      <Router>
        <NavBar
          logText={logText}
          setLogText={setLogText}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
        />
        <main>
          <Routes>
            <Route path="/" element={<Home setLogText={setLogText} />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route
              path="/resources/:resource_id/"
              element={<ShowResource userId={userInfo.userId} />}
            />
            <Route path="/resources/create" element={<NewResource />} />
            <Route path="admin" element={<AdminPage />}>
              <Route path="Resources_Usage" element={<ResourcesUsagePage />} />
              <Route path="users" element={<UsersPortal />} />
              <Route path="pendings" element={<Pendings />} />
            </Route>

            <Route
              path="/users/login"
              element={
                <LogInUser
                  setUserInfo={setUserInfo}
                  setLogText={setLogText}
                  mentors={mentors}
                />
              }
            />

            <Route path="/users/:uid/" element={<UserPortal />} />
            <Route path="/users/:uid/upload" element={<Uploader />} />
            <Route path="/about" element={<About />} />
            <Route path="/users/create" element={<CreateUser />} />
            <Route path="/highschool" element={<HighschoolPage />} />
            <Route path="/college" element={<CollegePage />} />
            <Route
              path="/continuedlearning"
              element={<ContinuedLearningPage />}
            />
            <Route
              path="/mentors"
              element={<MentorsPage mentors={mentors} uid={userInfo.userId} />}
            />
            <Route path="/mentors/:mentor_id/upload" element={<Uploader />} />
            <Route path="/mentors/create" element={<NewMentor />} />
            <Route path="/owners/:owner/upload" element={<Uploader />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
