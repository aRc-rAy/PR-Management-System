import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as api from "../../api/index.js";
import "./user.css";

const User = () => {
	const { userId } = useParams();
	const [approvals, setApprovals] = useState([]);
	const [allApprovals, setAllApprovals] = useState([]);
	const [status, setStatus] = useState(0);
	const [user, setUser] = useState({});
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const fetchApprovals = async () => {
			try {
				const { data } = await api.getApprovals();
				setAllApprovals(data);
				const userData = await api.getUser(userId);
				const allUsers = await api.getUsers();
				const myApprovalData = await data.filter(
					(item) => item.approver._id === userId
				);
				setUsers(allUsers.data);
				setApprovals(myApprovalData);
				setUser(userData.data);
			} catch (error) {
				console.log("Error at fetchApprovals in user page");
				console.log(error.message);
			}
		};
		fetchApprovals();
	}, [setApprovals, status]);

	const updateStatus = async (id, status) => {
		try {
			await api.updateStatus(id, { status });
			const updatedApprovals = approvals.map((item) =>
				item._id === id ? { ...item, status } : item
			);
			setStatus(!status);
			setApprovals(updatedApprovals);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="main-box">
			<div className="top-box">
				<h1>Username : {user?.username}</h1>
				<h2>Email : {user?.email}</h2>
				<h2>Notifications: {approvals.length} </h2>
			</div>
			<div className="info-box" style={{ display: "flex" }}>
				<div
					className="right-box"
					style={{
						display: "flex",
						flexWrap: "wrap",
						justifyContent: "center",
						alignItems: "center",
						flexDirection: "row",
					}}
				>
					{approvals.length === 0 && <h1>.........</h1>}
					{approvals.map((item, index) => (
						<div
							className="review-box"
							style={{
								border: "1px solid black",
								borderRadius: "8px",
								width: "40vw",
								display: "flex",
								margin: "15px",
							}}
							key={index}
						>
							<h3 className="item-status">
								<strong>PR type:</strong> {item?.pullRequest?.prType}
							</h3>
							<h3 className="item-status">
								<strong>PR title:</strong> {item?.pullRequest?.title}
							</h3>
							<h3 className="item-status">
								<strong>PR description:</strong>{" "}
								{item?.pullRequest?.description}
							</h3>
							<h3 className="item-status">
								<strong>PR status:</strong> {item?.pullRequest?.status}
							</h3>

							<h3 className="item-status" style={{ color: "red" }}>
								<strong>Status :</strong> {item?.status}
							</h3>

							<strong style={{ margin: "15px" }}>All approvers :</strong>

							{item?.pullRequest?.approvers.map((mail, index) => (
								<strong
									style={{
										marginLeft: "15px",
										marginTop: "5px",
										marginBottom: "5px",
										display: "block",
										color: "black",
									}}
									key={index}
								>
									{index + 1}. {mail.approverId}
								</strong>
							))}

							<strong style={{ margin: "15px" }}>Assigned approvers :</strong>
							{item?.pullRequest?.approvers.map((mail, index) => (
								<div key={index}>
									<h3 className="item-status" style={{ color: "red" }}>
										{allApprovals
											.filter((approval) => {
												return (
													approval?.approver?.email === mail?.approverId &&
													approval?.pullRequest?._id === item?.pullRequest?._id
												);
											})
											.map((approve, Iindex) => (
												<div
													key={Iindex}
													style={{
														border: "2px solid black",
														borderRadius: "8px",
														margin: "10px",
														padding: "10px",
													}}
												>
													<h3 className="item-status" style={{ color: "red" }}>
														<strong> Approver :</strong>{" "}
														{approve?.approver?.email}
													</h3>
													<h3 className="item-status" style={{ color: "red" }}>
														<strong>Status :</strong> {approve?.status}
													</h3>
												</div>
											))}
									</h3>
								</div>
							))}

							<div className="status-button">
								<div className="approve">
									<button onClick={() => updateStatus(item._id, "Approved")}>
										Approve
									</button>
								</div>
								<div className="approve">
									<button onClick={() => updateStatus(item._id, "Rejected")}>
										Reject
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default User;
