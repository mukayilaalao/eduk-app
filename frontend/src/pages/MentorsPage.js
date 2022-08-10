import AllMentors from "../components/AllMentors.js";
import React from "react";
import CreateMentor from "../components/CreateMentor.js";

function MentorsPage({ mentors, uid }) {
  return (
    <div>
      {uid && !isNaN(uid) ? (
        <AllMentors mentors={mentors} uid={uid} />
      ) : (
        <CreateMentor />
      )}
    </div>
  );
}
export default MentorsPage;
