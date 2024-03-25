import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import cors from "cors";
import path from "path";

dotenv.config();
// ------------------> Routes <------------------//
import pullRequestRoutes from "./routes/pullRequest.js";
import commentRoutes from "./routes/comments.js";
import approvalRoutes from "./routes/approvals.js";
import userRoutes from "./routes/users.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/pull-requests", pullRequestRoutes);
app.use("/pull-requests/comments/", commentRoutes);
app.use("/pull-requests/approvals/", approvalRoutes);
app.use("/pull-requests/users/", userRoutes);

// ===============================Deployment Start=============================================
const fullPath = path.resolve();
const directoryPath = path.dirname(fullPath);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(directoryPath, "/frontend/build")));

	app.get("/", (req, res) => {
		res.sendFile(
			path.resolve(directoryPath, "frontend", "build", "index.html")
		);
	});
} else {
	app.get("/", (req, res) => {
		res.status(200).send("API runnning successfully....");
	});
}
// ===============================Deployment End===============================================

const CONNECTION_URL = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.xpnnypl.mongodb.net/?retryWrites=true&w=majority`;

mongoose
	.connect(CONNECTION_URL)
	.then(() => {
		console.log("Connected to MongoDB");
		app.listen(process.env.PORT, () => {
			console.log(`Server running on port ${process.env.PORT}`);
		});
	})
	.catch((error) => console.log(error.message));
