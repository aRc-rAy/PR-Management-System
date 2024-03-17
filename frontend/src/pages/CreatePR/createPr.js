import React, { useState } from "react";
import * as api from "../../api/index";
import { useNavigate } from "react-router-dom";
import "./createPR.css";

const CreatePr = () => {
	const navigate = useNavigate();

	const [pullRequest, setPullRequest] = useState({
		title: "",
		description: "",
		requesterId: "",
		approvers: [],
		status: "Open",
		parallel: false,
	});
	const [approvers, setApprovers] = useState([""]);

	const handleChange = (e) => {
		setPullRequest({ ...pullRequest, [e.target.name]: e.target.value });
	};

	const handleApproverChange = (e, index) => {
		const newApprovers = [...approvers];
		newApprovers[index] = e.target.value;
		setApprovers(newApprovers);
		setPullRequest({ ...pullRequest, approvers: newApprovers });
	};

	const handleAddApprover = () => {
		setApprovers([...approvers, ""]);
		setPullRequest({ ...pullRequest, approvers: [...approvers, ""] });
	};

	const handleRemoveApprover = (index) => {
		const newApprovers = [...approvers];
		newApprovers.splice(index, 1);
		setApprovers(newApprovers);
		setPullRequest({ ...pullRequest, approvers: newApprovers });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await api.postPullRequest(pullRequest);

			if (!response) {
				throw new Error("HTTP error " + response.status);
			}
			alert("Pull request submitted successfully");
			navigate("/");
		} catch (error) {
			console.error("Error:", error);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<label>
				Title:
				<input type="text" name="title" onChange={handleChange} />
			</label>
			<hr />
			<label>
				Description:
				<textarea name="description" onChange={handleChange} />
			</label>
			<hr />
			<label>
				Parallel
				<input
					type="checkbox"
					name="parallel"
					checked={pullRequest.parallel}
					onChange={(e) =>
						setPullRequest({ ...pullRequest, parallel: e.target.checked })
					}
				/>
			</label>
			<hr />
			<label>
				Requester Mail:
				<input type="text" name="requesterId" onChange={handleChange} />
			</label>
			<hr />
			{approvers.map((approver, index) => (
				<div key={index}>
					<label>
						Approver {index + 1}: Email
						<input
							type="text"
							name="approvers"
							value={approver}
							onChange={(e) => handleApproverChange(e, index)}
						/>
					</label>
					<button
						type="button"
						onClick={() => handleRemoveApprover(index)}
						style={{ marginTop: "5px" }}
					>
						Remove
					</button>
				</div>
			))}
			<button
				type="button"
				onClick={handleAddApprover}
				style={{ marginTop: "5px" }}
			>
				Add Approver
			</button>
			<hr />
			<label>
				Status:
				<select name="status" onChange={handleChange}>
					<option value="Open">Open</option>
					<option value="Approved">Approved</option>
					<option value="Rejected">Rejected</option>
				</select>
			</label>
			<hr />
			<button type="submit">Submit</button>
		</form>
	);
};

export default CreatePr;
