import React, { useEffect, useState } from "react";
import PrBox from "./PR_box";
import * as api from "../../api/index";
import "./pr.css";

const AllPrs = () => {
	const [prs, setPrs] = useState([]);

	useEffect(() => {
		const fetchPrs = async () => {
			const { data } = await api.getPullRequests();
			setPrs(data);
		};

		fetchPrs();
	}, []);

	const handleClick = () => {
		window.location.href = "/pr/create";
	};

	return (
		<div className="pr-main-body">
			<h1 style={{ margin: "10px" }}>All PRs</h1>
			<button className="pr-create-btn" onClick={handleClick}>
				Create PR
			</button>
			<div className="pr-boxes">
				{prs.map((pr) => (
					<PrBox key={pr._id} pr={pr} />
				))}
			</div>
		</div>
	);
};

export default AllPrs;
