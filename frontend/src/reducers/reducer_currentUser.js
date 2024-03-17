const currentUserReducer = (state = null, action) => {
	switch (action.type) {
		case "AUTH":
			localStorage.setItem("profile", JSON.stringify(action?.data));
			return action?.data;
		case "LOGOUT":
			localStorage.removeItem("profile");
			return null;
		default:
			return state;
	}
};

export default currentUserReducer;
