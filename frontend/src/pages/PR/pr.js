import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as api from "../../api/index";
import "./pr.css";

const Pr = () => {
	const { prId } = useParams();
	const [comment, setComment] = useState("");
	const [pr, setPr] = useState({});

	useEffect(() => {
		const fetchPr = async () => {
			try {
				const response = await api.getPullRequest(prId);
				if (!response) {
					throw new Error(
						response.data.message || "HTTP error " + response.status
					);
				}
				setPr(response.data);
			} catch (error) {
				console.error("Error:", error);
			}
		};

		fetchPr();
	});

	const handleCommentSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await api.postComment(
				{
					prId,
					comment,
				},
				prId
			);

			if (!response) {
				throw new Error("HTTP error " + response.status);
			}

			alert("Comment added successfully");
			setComment("");
		} catch (error) {
			console.error("Error:", error);
		}
	};
	return (
		<div className="pr-body">
			{pr ? (
				<>
					<h2 className="pr-id">PR id: {pr._id}</h2>
					<p className="pr-desc">PR description: {pr.description}</p>

					<p className="pr-status">PR status: {pr.status}</p>

					<h2>Approvers :</h2>
					{pr?.approvers?.map((approver) => (
						<p key={approver}>{approver}</p>
					))}

					<h2>Comments</h2>
					{pr?.comments?.map((comment, index) => (
						<div key={index} className="comment">
							<p>
								<strong>{index + 1}.</strong> {comment}
							</p>
						</div>
					))}
					<br />
					<textarea
						type="text"
						value={comment}
						onChange={(e) => setComment(e.target.value)}
						style={{ width: "100%", height: "100px" }}
					/>
					<div>
						<button onClick={handleCommentSubmit}>Comment</button>
					</div>
				</>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
};

export default Pr;
