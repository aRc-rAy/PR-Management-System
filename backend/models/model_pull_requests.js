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
		approvers: [
			{
				approverId: {
					type: String,
					required: true,
				},
				level: {
					type: Number,
					default: 1,
				},
			},
		],
		currentLevel: {
			type: Number,
			default: 1,
		},
		totalLevel: {
			type: Number,
			default: 1,
		},
		prType: {
			type: String,
			enum: ["Parallel", "Sequential", "Hybrid"],
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
