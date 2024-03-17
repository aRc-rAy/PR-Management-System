import express from "express";
import {
	getPullRequests,
	createPullRequest,
	getPullRequest,
	deletePullRequest,
	updatePullRequest,
} from "../controllers/controller_pull_requests.js";

const router = express.Router();

router.get("/", getPullRequests);
router.get("/:id", getPullRequest);
router.post("/", createPullRequest);
router.patch("/:id", updatePullRequest);
router.delete("/:id", deletePullRequest);

export default router;
