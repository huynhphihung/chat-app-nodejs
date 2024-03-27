import React, { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../hooks/useGetConversations";
import toast from "react-hot-toast";

export default function SearchInput() {
  const [searchInput, setSearchInput] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchInput) return;
    if (searchInput.length < 3) {
      return toast.error("Search must be at least 3 characters long");
    }
    const conversation = conversations.find((c) =>
      c.fullName.toLowerCase().includes(searchInput.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearchInput("");
    } else {
      toast.error("No such user found!");
    }
  };
  return (
    <form
      className="flex items-center justify-center gap-2"
      onSubmit={handleSubmit}
    >
      <input
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        type="text"
        placeholder="Search..."
        className="input input-bordered rounded-full"
      />
      <button type="submit" className="btn btn-circle bg-sky-500">
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
}
