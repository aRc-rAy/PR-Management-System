import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import cors from "cors";

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
