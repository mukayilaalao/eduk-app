import React from "react";

import axios from "axios";
import { useState, useEffect } from "react";
import SingleResource from "./SingleResource";

const API = process.env.REACT_APP_API_URL;

export default function ContinueLearning() {
	const [ContinueLearning, setContinueLearning] = useState([]);

	useEffect(() => {
		axios
			.get(API + "/resources")
			.then((response) => {
				setContinueLearning(response.data.result);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);
	return (
		<div>
			<h1 className="resourceCategory">Continue Learning</h1>
			<section className="highSchoolMain">
				<div>
					<h3>Programs</h3>
					<p>
						The Programs are listed for high school students in need for
						programs <br /> to excel in technical skills and soft skills works
						that demand you
					</p>
				</div>
				<div className="resource-arr">
					{ContinueLearning.map((ContinueLearning) => {
						return (
							<SingleResource
								key={ContinueLearning.resource_id}
								resource={ContinueLearning}
							/>
						);
					})}
				</div>
			</section>
			<section className="highSchoolMain">
				<div>
					<h3>class</h3>
					<p>
						The Programs are listed for high school students in need for
						programs <br /> to excel in technical skills and soft skills works
						that demand you
					</p>
				</div>
				<div>List of the programs</div>
			</section>
			<section className="highSchoolMain">
				<div>
					<h3>scholarship</h3>
					<p>
						The Programs are listed for high school students in need for
						programs <br /> to excel in technical skills and soft skills works
						that demand you
					</p>
				</div>
				<div>List of the programs</div>
			</section>
		</div>
	);
}
