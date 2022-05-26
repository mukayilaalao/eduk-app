import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import "./ResourceCategory.css";
import SuccessMessage from "./SucccesMessage";

const API = process.env.REACT_APP_API_URL;

function ResourceDetails() {
	const [resource, setResource] = useState([]);
	//show message after adding a resource
	const [showMessage, setShowMessage] = useState(false);
	let { resource_id } = useParams();

	//   const navigate = useNavigate();

	let userId = localStorage.getItem("userId");

	useEffect(() => {
		axios
			.get(API + "/resources/" + resource_id)
			.then((response) => {
				setResource(response.data.result);
				console.log(setResource);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [resource_id]);

	// adding the resource to the particular user
	const addResource = () => {
		axios
			.post(`${API}/users/${userId}/resources`, {
				uid: userId,
				resource_id: resource_id,
			})
			.then(() => setShowMessage(true))
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div className="rD">
			<div className="resource-heading">
				<h1> {resource.resource_name} </h1>
			</div>
			<div className="resource-text">
				<p> {resource.description} </p>
				<div className="resourceMainBtn">
					<div className="visit-site-button">
						<a target="blank" href={resource.url}>
							<Button variant="contained" size="small">
								Visit {resource.resource_name}
							</Button>
						</a>
					</div>
					<div>
						<Button
							onClick={() => addResource()}
							variant="contained"
							size="small"
						>
							Add resource
						</Button>
					</div>
					<div>{showMessage ? <SuccessMessage /> : ""}</div>
				</div>
			</div>
		</div>
	);
}

export default ResourceDetails;
