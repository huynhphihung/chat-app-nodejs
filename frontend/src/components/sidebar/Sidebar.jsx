import React from "react";

export default function Sidebar() {
  return (
    <div>
      <SearchInput />
      <div className="divider px-3"></div>
      <Conversation />
      <LogoutButton />
    </div>
  );
}
