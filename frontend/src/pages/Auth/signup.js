import React, { useState } from "react";
import "./auth.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signup } from "../../actions/auth";

const Signup = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(signup({ username, password, email }, navigate));
	};

	return (
		<div className="form-body">
			<form onSubmit={handleSubmit}>
				<div className="form-element">
					<label>
						Username:
						<input
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</label>
				</div>
				<div className="form-element">
					<label>
						Email:
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</label>
				</div>
				<div className="form-element">
					<label>
						Password:
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</label>
				</div>
				<div className="form-element">
					<button type="submit">Signup</button>
				</div>
			</form>
		</div>
	);
};

export default Signup;
