import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as api from "../../api/index.js";
import "./user.css";

const User = () => {
	const { userId } = useParams();
	const [approvals, setApprovals] = useState([]);
	const [myPullRequests, setMyPullRequests] = useState([]);
	const [user, setUser] = useState({});

	useEffect(() => {
		const fetchApprovals = async () => {
			try {
				const { data } = await api.getApprovals();
				const userData = await api.getUser(userId);
				const myApprovalData = await data.filter(
					(item) => item.approverId === userId
				);

				setApprovals(myApprovalData);
				setUser(userData.data);
			} catch (error) {
				console.log("Error at fetchApprovals in user page");
				console.log(error.message);
			}
		};
		fetchApprovals();
	}, [userId]);

	const updateStatus = async (id, status) => {
		try {
			await api.updateStatus(id, { status });
			const updatedApprovals = approvals.map((item) =>
				item._id === id ? { ...item, status } : item
			);
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
			<div className="info-box">
				<div className="left-box">
					<h2>My PRs : </h2>
					{myPullRequests.map((item, index) => (
						<div className="review-box" key={index}>
							<h3 className="pull-id">
								<strong>Created by:</strong> {item.pullRequestId}
							</h3>
							<h3 className="item-id">
								<strong>Item id:</strong> {item._id}
							</h3>

							<h3 className="item-status">
								<strong>Status :</strong> {item.status}
							</h3>
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
				<div className="right-box">
					<h2>My Reviews :</h2>
					{approvals.map((item, index) => (
						<div className="review-box" key={index}>
							<h3 className="pull-id">
								<strong>Created by:</strong> {item.pullRequestId}
							</h3>
							<h3 className="item-id">
								<strong>Item id:</strong> {item._id}
							</h3>

							<h3 className="item-status">
								<strong>Status :</strong> {item.status}
							</h3>
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
