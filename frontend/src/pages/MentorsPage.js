import AllMentors from "../components/AllMentors.js";
import React from "react";
import CreateMentor from "../components/CreateMentor.js";

function MentorsPage({ mentors, userInfo, setUserInfo }) {
  return (
    <div>
      {userInfo.userId && !isNaN(userInfo.userId) ? (
        <AllMentors
          mentors={mentors}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
        />
      ) : (
        <CreateMentor />
      )}
    </div>
  );
}
export default MentorsPage;
