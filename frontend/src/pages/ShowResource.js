import React from "react";
import ResourceDetails from "../components/ResourceDetails";

function ShowResource({ userId }) {
  return (
    <div>
      <ResourceDetails userId={userId} />
    </div>
  );
}

export default ShowResource;
