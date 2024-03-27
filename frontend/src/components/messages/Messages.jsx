import Message from "./Message";
import useGetMessages from "../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import useListenMessages from "../hooks/useListenMessages";
import useSendMessage from "../hooks/useSendMessage.js";

export default function Messages() {
	const { messages, loading } = useGetMessages();
	const { messageEndRef } = useSendMessage();
	useListenMessages();

	return (
		<div className="px-4 flex-1 overflow-auto ">
			{!loading &&
				messages.length > 0 &&
				messages.map((message) => {
					return (
						<div
							ref={messageEndRef}
							key={message._id}
						>
							<Message message={message} />
						</div>
					);
				})}
			{loading && [...Array(3).map((_, idx) => <MessageSkeleton key={idx} />)]}
			{!loading && messages.length === 0 && <p className="text-center">Send a message to start the conversation</p>}
		</div>
	);
}
