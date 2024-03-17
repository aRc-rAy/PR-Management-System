import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as api from "../../api/index";
import "./allUsers.css";

const Users = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const fetchUsers = async () => {
			const response = await api.getUsers();
			setUsers(response.data);
		};

		fetchUsers();
	}, []);

	return (
		<div className="main-card">
			{users.length === 0 ? (
				<p className="loading">Loading....</p>
			) : (
				users.map((user) => (
					<div key={user._id} className="card">
						<h2 className="user-name">{user.username}</h2>
						<p className="user-email">{user.email}</p>
						<Link to={`/user/${user._id}`}>View Profile</Link>
					</div>
				))
			)}
		</div>
	);
};

export default Users;
