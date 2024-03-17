import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
	reviewId: {
		type: String,
		required: true,
		unique: true,
	},
	pullRequestId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "PullRequest",
	},
	reviewerId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "User",
	},
	comments: {
		type: String,
	},
	createdAt: {
		type: Date,
		default: new Date(),
	},
});

export default mongoose.model("Review", reviewSchema);
