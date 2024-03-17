import express from "express";
import {
	getApprovals,
	updateStatus,
} from "../controllers/controller_approvals.js";
const router = express.Router();

router.post("/:id", updateStatus);
router.get("/all", getApprovals);

export default router;
