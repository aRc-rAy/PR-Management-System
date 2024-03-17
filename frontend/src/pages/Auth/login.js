import React, { useState } from "react";
import "./auth.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../actions/auth";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();

	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(login({ email, password }, navigate));
	};

	return (
		<div className="form-body">
			<form onSubmit={handleSubmit}>
				<div className="form-element">
					<label>
						Email:
						<input
							type="text"
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
					<button type="submit">Login</button>
				</div>
			</form>
		</div>
	);
};

export default Login;
