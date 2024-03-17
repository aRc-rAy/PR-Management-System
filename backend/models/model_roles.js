import mongoose from "mongoose";

const roleSchema = mongoose.Schema({
	roleId: {
		type: String,
		required: true,
		unique: true,
	},
	roleName: {
		type: String,
		required: true,
	},
});

export default mongoose.model("Role", roleSchema);
