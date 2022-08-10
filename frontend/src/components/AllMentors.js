import React from "react";
import "../css/Mentor.css";
import Mentor from "./Mentor.js";

function AllMentors({ mentors, uid }) {
  return (
    <section className="mentor-list">
      {mentors.map((mentor) => {
        return <Mentor key={mentor.mentor_id} mentor={mentor} uid={uid} />;
      })}
    </section>
  );
}

export default AllMentors;
