import User from "../models/model_users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
	const { email, password } = req.body;
	try {
		const existingUser = await User.findOne({ email: email });
		if (!existingUser) {
			return res.status(404).json({ message: "User doesn't exist" });
		}
		const isPasswordCorrect = await bcrypt.compare(
			password,
			existingUser.password
		);

		if (!isPasswordCorrect) {
			return res.status(400).json({ message: "Invalid credentials" });
		}
		const token = jwt.sign(
			{ email: existingUser.email, id: existingUser._id },
			"test",
			{ expiresIn: "100h" }
		);
		console.log("Login successful");
		return res.status(200).json({ result: existingUser, token });
	} catch (error) {
		console.log("Error at login controller");
		return res.status(500).json({ message: "Something went wrong" });
	}
};

export const signup = async (req, res) => {
	const { email, password, username } = req.body;
	try {
		const existingUser = await User.findOne({ email: email });

		if (existingUser) {
			console.log("already exists user");
			return res.status(400).json({ message: "User already exists" });
		}
		console.log(req.body);
		const hashedPassword = await bcrypt.hash(password, 12);
		const result = await User.create({
			email,
			password: hashedPassword,
			username,
		});
		const token = jwt.sign({ email: result.email, id: result._id }, "test", {
			expiresIn: "300h",
		});
		res.status(200).json({ result, token });
	} catch (error) {
		console.log("Error at signup controller");
		res.status(500).json({ message: "Error at signup controller" });
	}
};

export const getUsers = async (req, res) => {
	try {
		const users = await User.find();
		return res.status(200).json(users);
	} catch (error) {
		console.log("Error at getUsers controller");
		return res.status(404).json({ message: error.message });
	}
};

export const getUser = async (req, res) => {
	const { id } = req.params;
	try {
		const user = await User.findById(id);
		return res.status(200).json(user);
	} catch (error) {
		console.log("Error at getUser controller");
		return res.status(404).json({ message: error.message });
	}
};
