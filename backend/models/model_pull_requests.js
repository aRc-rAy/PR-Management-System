import mongoose from "mongoose";

const pullRequestSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
		requesterId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		approvers: {
			type: Array,
			default: [],
		},
		parallel: {
			type: Boolean,
			default: false,
		},
		comments: {
			type: Array,
			default: [],
		},
		status: {
			type: String,
			enum: ["Open", "Approved", "Rejected"],
			default: "Open",
		},
	},
	{ timestamps: true }
);

export default mongoose.model("PullRequest", pullRequestSchema);
