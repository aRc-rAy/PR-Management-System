import Approvals from "../models/model_approvals.js";
import PullRequests from "../models/model_pull_requests.js";
import Users from "../models/model_users.js";

export const createApproval = async (req, res) => {
	const approval = req.body;
	const newApproval = new Approvals(approval);
	try {
		await newApproval.save();
		return res.status(200).json(newApproval);
	} catch (error) {
		console.log("Error in createApproval: ", error.message);
		return res.status(409).json({ message: error.message });
	}
};

export const getApprovals = async (req, res) => {
	try {
		const approvals = await Approvals.find()
			.populate({
				path: "approverId",
				select: "username email _id",
			})
			.populate("pullRequestId")
			.lean()
			.then((allApprovals) => {
				allApprovals.forEach((app) => {
					app.approver = app.approverId;
					delete app.approverId;
				});

				return allApprovals;
			})
			.then((allApprovals) => {
				allApprovals.forEach((app) => {
					app.pullRequest = app.pullRequestId;
					delete app.pullRequestId;
				});

				return allApprovals;
			});

		return res.status(200).json(approvals);
	} catch (error) {
		console.log("Error in getApprovals: ", error.message);
		return res.status(404).json({ message: error.message });
	}
};

export const updateStatus = async (req, res) => {
	const { id } = req.params;
	const { status } = req.body;
	try {
		const approval = await Approvals.findById(id);
		const pullRequestId = approval.pullRequestId;

		const pullRequest = await PullRequests.findById(pullRequestId);

		if (!pullRequest.parallel && pullRequest.approvers.length > 0) {
			pullRequest.approvers.shift();
			if (pullRequest.approvers.length > 0) {
				if (status === "Approved") {
					const nextApprover = await Users.findOne({
						email: pullRequest.approvers[0],
					});
					const newApproval = new Approvals({
						pullRequestId: pullRequestId,
						approverId: nextApprover._id,
					});
					await newApproval.save();
				} else {
					pullRequest.approvers = [];
					pullRequest.status = "Rejected";
				}
			}
			if (pullRequest.approvers.length === 0) {
				pullRequest.status = status;
			}
			await pullRequest.save();
		}

		// Set approval status
		if (approval.status !== "Pending") {
			return res.status(200).json({ message: "Already marked" });
		}
		approval.status = status;
		await approval.save();

		if (pullRequest.prType === "Parallel") {
			if (status === "Rejected") {
				pullRequest.status = "Rejected";
			}

			if (pullRequest.status !== "Rejected") {
				const myApprovals = await Approvals.find({
					pullRequestId: pullRequest._id,
				});

				let AllAccepted = true;
				for (let approval of myApprovals) {
					if (approval.status != "Accepted") {
						AllAccepted = false;
					}
				}

				if (AllAccepted) {
					pullRequest.status = "Accepted";
				}
			}
			await pullRequest.save();
		}
		if (pullRequest.prType === "Hybrid") {
			
		}
		if (pullRequest.prType === "Sequential") {
			if (status === "Accepted") {
				for (let i = 0; i <= pullRequest.approvers.length; i++) {
					if (i === pullRequest.approvers.length) {
						pullRequest.status = "Accepted";
						await pullRequest.save();
						return res.status(200).json(approval);
					}
					const user = await Users.find({
						email: pullRequest.approvers[i].approverId,
					});

					const myApproval = await Approvals.findById({ approverId: user._id });

					if (!myApproval) {
						const newApproval = new Approvals({
							pullRequestId: pullRequest._id,
							approverId: user._id,
						});
						await newApproval.save();
						return res.status(200).json(newApproval);
					}
				}
			} else {
				pullRequest.status = "Rejected";
			}
			await pullRequest.save();
		}

		return res.status(200).json(approval);
	} catch (error) {
		console.log("Error in updateStatus: ", error.message);
		return res.status(404).json({ message: error.message });
	}
};
