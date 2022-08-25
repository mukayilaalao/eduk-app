import React from "react";
import { Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

function PendingResources() {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    axios
      .get(API + "/resources", { withCredentials: true })
      .then((response) => {
        let resourcesInfo = response.data.result;

        setResources(resourcesInfo);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleRemoveresource = (rid) => {
    const newresources = resources.filter(
      (resource) => resource.resource_id !== rid
    );
    setResources(newresources);
  };

  const handleApprove = (resource) => {
    resource = { ...resource, is_verified: true };
    axios
      .put(API + "/resources/" + resource.resource_id, resource, {
        withCredentials: true,
      })
      .catch((error) => {
        console.log(error);
      });
    handleRemoveresource(resource.resource_id);
  };

  const handleDeny = (rid) => {
    axios
      .delete(API + "/resources/" + rid, { withCredentials: true })
      .catch((error) => {
        console.log(error);
      });
    handleRemoveresource(rid);
  };

  const resourceChecklist = resources.filter(
    (resource) => resource.is_verified === false
  );

  return (
    <>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Resource Name</th>
            <th>Category</th>
            <th>For</th>
            <th>Start_datetime</th>
            <th>End_datetime</th>
            <th>Url</th>
            <th>Description</th>
            <th>Is Verfified</th>
          </tr>
        </thead>
        <tbody>
          {resourceChecklist.map((resource) => {
            return (
              <tr>
                <td>{resource.resource_name}</td>
                <td>
                  {resource.resourcefor.length
                    ? resource.resourcefor
                        .filter((ele) => ele !== "null")
                        .join(" & ")
                    : ""}
                </td>
                <td>{resource.resource_category}</td>
                <td>{resource.start_datetime}</td>
                <td>{resource.end_datetime}</td>
                <td>{resource.url}</td>
                <td>{resource.description}</td>
                <td>
                  <button onClick={() => handleApprove(resource)}>
                    Approve
                  </button>

                  <button onClick={() => handleDeny(resource.resource_id)}>
                    Deny
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <h2>Please update resources status, thank you!</h2>
    </>
  );
}

export default PendingResources;
