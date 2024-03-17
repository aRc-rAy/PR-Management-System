import express from "express";
import {
	signup,
	login,
	getUsers,
	getUser,
} from "../controllers/controller_users.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/users", getUsers);
router.get("/:id", getUser);
export default router;
