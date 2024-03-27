import React from "react";
import Sidebar from "../../components/Sidebar";
import MessageContainer from "../../components/messages/MessageContainer";

export default function Home() {
  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-600 shadow-2xl ">
      <Sidebar />
      <MessageContainer />
    </div>
  );
}
