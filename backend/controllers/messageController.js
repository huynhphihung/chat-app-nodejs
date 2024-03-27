import { messageModel } from "../model/messageModel.js";
import { conversationModel } from "../model/conversationSchema.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
	try {
		const { message } = req.body;
		const { userId: receiverId } = req.params;
		const senderId = req.user._id;

		let conversation = await conversationModel.findOne({
			participants: { $all: [senderId, receiverId] },
		});

		if (!conversation) {
			conversation = await conversationModel.create({
				participants: [senderId, receiverId],
			});
		}
		const newMessage = new messageModel({
			senderId,
			receiverId: receiverId,
			message,
		});

		if (newMessage) {
			conversation.messages.push(newMessage._id);
		}
		//await conversation.save();
		//await newMessage.save();

		//SOCKET IO WILL RUN HERE
		const receiverSocketId = getReceiverSocketId(receiverId);
		if (getReceiverSocketId) {
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

		await Promise.all([conversation.save(), newMessage.save()]);

		res.status(200).json(newMessage);
	} catch (err) {
		res.status(500).json({ err: "Internal Server Error: messageController " });
	}
};

export const getMessages = async (req, res) => {
	try {
		const { id: userToChatId } = req.params;
		const senderId = req.user._id;

		const conversation = await conversationModel
			.findOne({
				participants: { $all: [senderId, userToChatId] },
			})
			.populate("messages");
		if (!conversation) return res.status(200).json([]);
		const messages = conversation.messages;
		res.status(200).json(messages);
	} catch (error) {
		console.log("Error in getMessages Controller", error.message);
		res.status(500).json({ error: "Internal Server Error: messageController" });
	}
};
