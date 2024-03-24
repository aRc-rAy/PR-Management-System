import mongoose from "mongoose";

const approvalSchema = mongoose.Schema(
	{
		pullRequestId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "PullRequest",
		},
		approverId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		status: {
			type: String,
			enum: ["Pending", "Approved", "Rejected"],
			default: "Pending",
		},
		level: {
			type: Number,
			default: 1,
		},
		status: {
			type: String,
			enum: ["Pending", "Approved", "Rejected"],
			default: "Pending",
		},
	},
	{ timestamps: true }
);

export default mongoose.model("Approval", approvalSchema);
