import React from "react";
import { Routes, Route } from "react-router-dom";
import User from "./pages/UserProfile/user.js";
import Pr from "./pages/PR/pr.js";
import AllPrs from "./pages/PR/allPRs.js";
import CreatePr from "./pages/CreatePR/createPr.js";
import Login from "./pages/Auth/login.js";
import Signup from "./pages/Auth/signup.js";
import Users from "./pages/AllUsers/users.js";
import EditPr from "./pages/PR/editPr.js";

const AllRoutes = () => {
	return (
		<Routes>
			<Route exact path="/" element={<AllPrs />} />
			<Route exact path="/users" element={<Users />} />
			<Route exact path="/user/:userId" element={<User />} />
			<Route exact path="/pr/:prId" element={<Pr />} />
			<Route exact path="/pr/create" element={<CreatePr />} />
			<Route exact path="/pr/edit/:id" element={<EditPr />} />
			<Route exact path="/login" element={<Login />} />
			<Route exact path="/signup" element={<Signup />} />
		</Routes>
	);
};

export default AllRoutes;
