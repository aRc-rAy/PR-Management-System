import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as api from "../../api/index.js";

const EditPr = () => {
	const { id } = useParams();
	const [pr, setPr] = useState(null);
	const [description, setDescription] = useState("");

	useEffect(() => {
		const fetchPr = async () => {
			try {
				const response = await api.getPullRequest(id);
				setPr(response.data);
				setDescription(response.data.description);
			} catch (error) {
				console.error(error);
			}
		};

		fetchPr();
	}, [id]);

	const handleSave = async () => {
		try {
			await api.updatePullRequest(id, { ...pr, description });
			alert("Pull request edited successfully");
			window.location.href = "/";
		} catch (error) {
			console.error(error);
		}
	};

	if (!pr) {
		return <div>Loading...</div>;
	}

	return (
		<div className="edit-card">
			<h1 className="edit-title">{pr.title}</h1>
			<textarea
				value={description}
				onChange={(e) => setDescription(e.target.value)}
				style={{ width: "100%", height: "200px" }}
			></textarea>
			<div>
				<button onClick={handleSave} className="save-btn">
					Save
				</button>
			</div>
		</div>
	);
};

export default EditPr;
