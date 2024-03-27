import { useState, useRef, useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import toast from "react-hot-toast";

export default function useSendMessage() {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();
	const messagesEndRef = useRef(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	const sendMessage = async (message) => {
		setLoading(true);
		try {
			const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ message }),
			});
			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}
			setMessages([...messages, data]);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};
	return { loading, sendMessage, messagesEndRef };
}
