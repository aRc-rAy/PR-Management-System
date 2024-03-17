// create root reducer for all reducers

// Path: frontend/src/reducers/index.js
import { combineReducers } from "redux";
import prs from "./reducer_prs";
import users from "./reducer_users";
import approvals from "./reducer_approvals";
import currentUserReducer from "./reducer_currentUser";

export default combineReducers({
	prs,
	users,
	approvals,
	currentUserReducer,
});
