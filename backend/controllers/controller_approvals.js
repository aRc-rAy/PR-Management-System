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
		const approvals = await Approvals.find();
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

		if (pullRequest.parallel) {
			if (status === "Approved") {
				pullRequest.status = "Approved";
			} else {
				pullRequest.status = "Rejected";
			}
			await pullRequest.save();
		}

		const updatedApproval = await Approvals.findByIdAndUpdate(
			id,
			{ status },
			{ new: true }
		);
		return res.status(200).json(updatedApproval);
	} catch (error) {
		console.log("Error in updateStatus: ", error.message);
		return res.status(404).json({ message: error.message });
	}
};
