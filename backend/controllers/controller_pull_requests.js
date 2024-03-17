import PullRequests from "../models/model_pull_requests.js";
import Approvals from "../models/model_approvals.js";
import Users from "../models/model_users.js";

export const createPullRequest = async (req, res) => {
	const pullRequest = req.body;
	const approvers = pullRequest.approvers;
	const requesterId = pullRequest.requesterId;
	const parallel = pullRequest.parallel;

	try {
		// Check if all approvers exist
		for (let email of approvers) {
			const user = await Users.findOne({ email: email });
			if (!user) {
				return res
					.status(400)
					.json({ message: `User with email ${email} does not exist` });
			}
		}
		// check if requester exists
		const requester = await Users.findOne({ email: requesterId });
		if (!requester) {
			return res.status(400).json({
				message: `Requester with email ${requesterId} does not exist`,
			});
		}

		// Create the PullRequest
		const newPullRequest = new PullRequests({
			...pullRequest,
			requesterId: requester._id,
		});
		await newPullRequest.save();

		// Create an Approval for each approver
		if (parallel) {
			for (let email of approvers) {
				const user = await Users.findOne({ email: email });
				const newApproval = new Approvals({
					pullRequestId: newPullRequest._id,
					approverId: user._id,
				});
				await newApproval.save();
			}
		} else {
			const user = await Users.findOne({ email: approvers[0] });
			const newApproval = new Approvals({
				pullRequestId: newPullRequest._id,
				approverId: user._id,
			});
			await newApproval.save();
		}

		return res.status(200).json(newPullRequest);
	} catch (error) {
		console.log("Error in createPullRequest: ", error.message);
		return res.status(409).json({ message: error.message });
	}
};

export const getPullRequests = async (req, res) => {
	try {
		const pullRequests = await PullRequests.find();
		return res.status(200).json(pullRequests);
	} catch (error) {
		console.log("Error in getPullRequests: ", error.message);
		return res.status(404).json({ message: error.message });
	}
};

export const getPullRequest = async (req, res) => {
	try {
		const pullRequest = await PullRequests.findById(req.params.id);
		return res.status(200).json(pullRequest);
	} catch (error) {
		console.log("Error in getPullRequest (single wala hai): ", error.message);
		return res.status(404).json({ message: error.message });
	}
};

export const deletePullRequest = async (req, res) => {
	try {
		const pullRequest = await PullRequests.findByIdAndDelete(req.params.id);
		return res.status(200).json({ message: "Deleted Successfully" });
	} catch (error) {
		console.log("Error in deletePullRequest: ", error.message);
		return res.status(404).json({ message: error.message });
	}
};

export const updatePullRequest = async (req, res) => {
	const pullRequest = req.body;
	try {
		const updatedPullRequest = await PullRequests.findByIdAndUpdate(
			req.params.id,
			pullRequest,
			{ new: true }
		);
		return res.status(200).json(updatedPullRequest);
	} catch (error) {
		console.log("Error in updatePullRequest: ", error.message);
		return res.status(409).json({ message: error.message });
	}
};
