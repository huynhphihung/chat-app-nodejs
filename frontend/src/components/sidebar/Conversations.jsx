import React from "react";
import Conversation from "./Conversation";
import useGetConversation from "../hooks/useGetConversations";
import { getRandomEmoji } from "../utils/emoji";

export default function Conversations() {
  const { loading, conversations } = useGetConversation();
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIdx={idx === conversations.length - 1}
        />
      ))}
    </div>
  );
}
