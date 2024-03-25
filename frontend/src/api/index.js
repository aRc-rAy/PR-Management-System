import axios from "axios";

const API = axios.create({
	baseURL: "https://pr-management-system.onrender.com/",
});

export const postPullRequest = (newPullRequest) =>
	API.post("/pull-requests/", newPullRequest);
export const getPullRequests = () => API.get("/pull-requests/");
export const getPullRequest = (id) => API.get(`/pull-requests/${id}`);
export const deletePullRequest = (id) => API.delete(`/pull-requests/${id}`);
export const updatePullRequest = (id, updatedPullRequest) =>
	API.patch(`/pull-requests/${id}`, updatedPullRequest);

export const getUsers = () => API.get("/pull-requests/users/users");
export const getUser = (id) => API.get(`/pull-requests/users/${id}`);

export const postComment = (newComment, id) =>
	API.post(`/pull-requests/comments/${id}`, newComment);

export const signUp = (newUser) =>
	API.post("/pull-requests/users/signup", newUser);
export const logIn = (user) => API.post("/pull-requests/users/login", user);

export const getApprovals = () => API.get("/pull-requests/approvals/all");
export const updateStatus = (id, updatedStatus) =>
	API.post(`/pull-requests/approvals/${id}`, updatedStatus);
