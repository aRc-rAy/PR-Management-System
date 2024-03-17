import express from "express";
import { updateComment } from "../controllers/controller_comments.js";

const router = express.Router();

router.post("/:id", updateComment);

router.get("/:id", (req, res) => {
	res.send("get all comments for a pull request");
});

export default router;
