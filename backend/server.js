import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import authRouter from "./routes/routes.js";
import messageRouter from "./routes/messageRoute.js";
import userRouter from "./routes/userRoute.js";
import { app, server } from "./socket/socket.js";

// use environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;
const URI = process.env.DB_URI;

const __dirname = path.resolve();

// apply middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// server routes
app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);
app.use("/api/users", userRouter);

// serve static files
app.use(express.static(path.join(__dirname, "/frontend/dist")));

// serve frontend for all other routes
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// connect to MongoDB and start server
mongoose
	.connect(URI)
	.then(() => {
		console.log("Connected to MongoDB");
		server.listen(PORT, () => {
			console.log(`Server is running on http://localhost:${PORT}`);
		});
	})
	.catch((err) => {
		console.error("Error connecting to MongoDB:", err);
	});
