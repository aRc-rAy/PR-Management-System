import * as api from "../api";

export const getUsers = () => async (dispatch) => {
	try {
		const res = await api.getusers();
		dispatch({
			type: "FETCH_USERS",
			payload: res.data,
		});
	} catch (err) {
		console.log("Error at action_users.js getUsers()");
		console.log(err);
	}
};
