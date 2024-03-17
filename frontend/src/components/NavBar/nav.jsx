import React from "react";
import { NavLink } from "react-router-dom";
import ProfilePicture from "../Avatar/avatar";
import "./nav.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { setCurrentUser } from "../../actions/currentUser";

const Nav = () => {
	const User = useSelector((state) => state.currentUserReducer) || null;

	const dispatach = useDispatch();
	useEffect(() => {
		const currentUser = localStorage.getItem("profile");
		if (currentUser) {
			dispatach(setCurrentUser(JSON.parse(currentUser)));
		}
	}, [dispatach]);

	return (
		<div className="nav-top">
			<nav>
				<NavLink to="/" exact>
					PR-Creators
				</NavLink>
				<NavLink to="/" exact>
					Home
				</NavLink>
				<NavLink to="/users">Users</NavLink>
				{User ? (
					<>
						<ProfilePicture username={User?.result?.username}></ProfilePicture>
						<button
							onClick={() => {
								dispatach({ type: "LOGOUT" });
							}}
						>
							Logout
						</button>
					</>
				) : (
					<>
						<NavLink to="/login">Login</NavLink>
						<NavLink to="/signup">Signup</NavLink>
					</>
				)}
			</nav>
		</div>
	);
};

export default Nav;
