import React, { useState, useEffect } from "react";
import * as api from "../../api/index";
import { useNavigate } from "react-router-dom";
import "./createPR.css";

const CreatePr = () => {
	const options = [
		{ value: "Parallel", label: "Parallel" },
		{ value: "Sequential", label: "Sequential" },
		{ value: "Hybrid", label: "Hybrid" },
	];

	const navigate = useNavigate();
	const [requesterId, setrequesterId] = useState("");
	const [user, setuser] = useState(null);
	const [selectedValue, setSelectedValue] = useState("Parallel");
	const [approvers, setApprovers] = useState([[""]]);
	const [pullRequest, setPullRequest] = useState({
		title: "",
		description: "",
		requesterId: "",
		approvers: [],
		status: "Open",
	});

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("profile"));
		if (!user) {
			navigate("/signup");
		}
		setuser(user);
		setrequesterId(user?.result?._id);
	}, []);

	const handleRadio = (event) => {
		setApprovers([[""]]);
		setSelectedValue(event.target.value);
	};

	const handleChange = (e) => {
		setPullRequest({ ...pullRequest, [e.target.name]: e.target.value });
	};

	const handleHybridChange = (e, index, arrIndex) => {
		setApprovers((prevApprovers) => {
			const updatedApprovers = [...prevApprovers];
			updatedApprovers[arrIndex][index] = e.target.value;
			return updatedApprovers;
		});
	};

	const handleAddHybridApprover = (arrIndex) => {
		setApprovers((prevApprovers) => {
			const updatedApprovers = [...prevApprovers];
			const oldApprover = [...updatedApprovers[arrIndex]];
			oldApprover.push("");
			updatedApprovers[arrIndex] = oldApprover;
			return updatedApprovers;
		});
	};

	const handleRemoveHybridApprover = (index, arrIndex) => {
		if (approvers.length > 1 || approvers[arrIndex].length > 1) {
			setApprovers((prevApprovers) => {
				const updatedApprovers = [...prevApprovers];
				const oldApprover = [...updatedApprovers[arrIndex]];
				if (oldApprover.length > 1) {
					oldApprover.splice(index, 1);
					updatedApprovers[arrIndex] = oldApprover;
				} else {
					updatedApprovers.splice(arrIndex, 1);
				}
				return updatedApprovers;
			});
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			pullRequest.requesterId = user?.result?.email;
			pullRequest.prType = selectedValue;
			pullRequest.approvers = [];
			approvers.forEach((approver, arrIndex) => {
				approver.forEach((app, index) => {
					pullRequest.approvers.push({ approverId: app, level: arrIndex + 1 });
				});
			});
			// console.log(pullRequest);
			const response = await api.postPullRequest(pullRequest);

			if (!response) {
				throw new Error("HTTP error " + response.status);
			}
			console.log(response);
			alert("Pull request submitted successfully");
			navigate("/");
		} catch (error) {
			console.error("Error:", error);
		}
	};

	const handleLevel = async (e) => {
		setApprovers((prevApprovers) => {
			const updatedApprovers = [...prevApprovers, [""]];
			return updatedApprovers;
		});
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

			<label style={{ fontWeight: "bolder", color: "#6c757d" }}>
				Requester : {user?.result?.email}
			</label>
			<hr />
			<label>
				PR type:
				<br />
				<div style={{ display: "inline", justifyContent: "space-around" }}>
					{options.map((option) => (
						<label
							key={option.value}
							style={{ display: "inline-block", margin: "13px" }}
						>
							{option.label}{" "}
							<input
								style={{ display: "inline" }}
								type="radio"
								value={option.value}
								checked={selectedValue === option.value}
								onChange={handleRadio}
							/>
						</label>
					))}
				</div>
			</label>
			<hr />
			{selectedValue === "Hybrid" && (
				<h1 key="hybrid" style={{ color: "Red" }}>
					Hybrid
				</h1>
			)}
			{approvers.map((subApprovers, arrIndex) => (
				<div key={arrIndex}>
					{selectedValue === "Hybrid" && (
						<h2
							style={{
								marginTop: "20px",
								color: "blue",
							}}
						>
							Level : {arrIndex + 1}
						</h2>
					)}
					{subApprovers?.map((approve, index) => (
						<>
							<div key={index} style={{ marginBottom: "20px" }}>
								<label>
									Approver {index + 1}'s Email :
									<input
										type="text"
										name={`approvers[${arrIndex}][${index}]`}
										value={approve}
										onChange={(e) => handleHybridChange(e, index, arrIndex)}
									/>
								</label>
								<button
									type="button"
									onClick={() => handleRemoveHybridApprover(index, arrIndex)}
									style={{ marginTop: "5px" }}
									className="delete-button"
								>
									Remove
								</button>
							</div>
							{index === subApprovers.length - 1 && (
								<button
									type="button"
									onClick={() => handleAddHybridApprover(arrIndex)}
									style={{ marginTop: "5px" }}
									className="edit-button"
								>
									Add Approver
								</button>
							)}
						</>
					))}
				</div>
			))}

			<hr />
			{selectedValue === "Hybrid" && (
				<button
					type="button"
					onClick={handleLevel}
					style={{ marginTop: "5px" }}
					className="add-level-button"
				>
					Add Level
				</button>
			)}

			<hr />

			<label>
				Status:
				<select name="status" onChange={handleChange}>
					<option value="Open">Open</option>
				</select>
			</label>
			<hr />
			<button type="submit">Submit</button>
		</form>
	);
};

export default CreatePr;
