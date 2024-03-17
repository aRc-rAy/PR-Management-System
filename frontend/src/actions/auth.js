import * as api from "../api/index.js";
import { setCurrentUser } from "./currentUser.js";
export const login = (formData, navigate) => async (dispatch) => {
	try {
		const { data } = await api.logIn(formData);
		dispatch(setCurrentUser(data));
		navigate("/");
	} catch (error) {
		console.log("Error at login action");
		console.log(error.message);
	}
};

export const signup = (formData, navigate) => async (dispatch) => {
	try {
		const { data } = await api.signUp(formData);
		dispatch(setCurrentUser(data));
		navigate("/");
	} catch (error) {
		console.log("Error at signup action");
		console.log(error.message);
	}
};
