// create reducer for approvals
const prReducer = (state = [], action) => {
	switch (action.type) {
		case "FETCH_PRS":
			return action.payload;
		case "UPDATE_PR":
			return state.map((pr) =>
				pr._id === action.payload._id ? action.payload : pr
			);
		case "DELETE_PR":
			return state.filter((pr) => pr._id !== action.payload._id);
		default:
			return state;
	}
};

export default prReducer;
