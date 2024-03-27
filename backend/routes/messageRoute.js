import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { sendMessage, getMessages } from "../controllers/messageController.js";

const router = express.Router();

router.get("/:id", protectRoute, getMessages);
router.post("/send/:userId", protectRoute, sendMessage);

export default router;
