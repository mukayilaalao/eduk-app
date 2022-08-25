import React from "react";
import "../css/Mentor.css";
import Mentor from "./Mentor.js";

function AllMentors({ mentors, userInfo, setUserInfo }) {
  return (
    <section className="mentor-list">
      {mentors.map((mentor) => {
        return (
          <Mentor
            key={mentor.mentor_id}
            mentor={mentor}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
          />
        );
      })}
    </section>
  );
}

export default AllMentors;
