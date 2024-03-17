import mongoose from "mongoose";

const userSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
	},
	password: {
		type: String,
		required: true,
	},
	roles: {
		type: Array,
		default: [],
	},
});

export default mongoose.model("User", userSchema);
