const approvalReducer = (state = [], action) => {
	switch (action.type) {
		case "FETCH_APPROVALS":
			return action.payload;
		case "UPDATE_APPROVAL":
			return state.map((approval) =>
				approval._id === action.payload._id ? action.payload : approval
			);
		case "DELETE_APPROVAL":
			return state.filter((approval) => approval._id !== action.payload._id);
		default:
			return state;
	}
};

export default approvalReducer;
