import PullRequests from "../models/model_pull_requests.js";

export const updateComment = async (req, res) => {
	const { id } = req.params;
	const { comment } = req.body;
	try {
		const pullRequest = await PullRequests.findById(id);
		pullRequest.comments.push(comment);
		await pullRequest.save();
		console.log(pullRequest);
		res.status(200).json(pullRequest);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};
