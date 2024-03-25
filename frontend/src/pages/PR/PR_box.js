import React from "react";
import { Link } from "react-router-dom";
import "./pr.css";
import * as api from "../../api/index.js";
import TruncatedDescription from "./TruncatedDescription.js";

const PrBox = ({ pr }) => {
	const prId = pr._id;
	console.log(pr);
	const handleDelete = async (e) => {
		e.preventDefault();
		try {
			await api.deletePullRequest(prId);
			window.location.reload();
		} catch (error) {
			console.error(error);
		}
		e.stopPropagation();
	};

	const handleEdit = (e) => {
		e.preventDefault();
		window.location.href = `/pr/edit/${prId}`;
	};

	return (
		<Link
			to={`/pr/${prId}`}
			style={{ textDecoration: "none", color: "inherit" }}
		>
			<div className="pr-box">
				<h1>Title: {pr?.title}</h1>
				<hr />

				<p>Status : {pr?.status}</p>
				<hr />
				<div className="pr-box-footer">
					<button onClick={handleEdit} className="edit-button">
						Edit
					</button>
					<button onClick={handleDelete} className="delete-button">
						Delete
					</button>
				</div>
			</div>
		</Link>
	);
};

export default PrBox;
