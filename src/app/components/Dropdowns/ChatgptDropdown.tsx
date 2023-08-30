import { ChatgptIcon } from "@app/icons";
import React, { useState } from "react";

interface ChatgptDropdownProps extends React.PropsWithChildren {}

export const ChatgptDropdown: React.FC<ChatgptDropdownProps> = ({}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <>
      <button
        className="p-1.5 hover:bg-gray-800 transition duration-150"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <ChatgptIcon size={15} />
      </button>
      {dropdownOpen && (
        <div className="z-50 absolute top-8 left-10 rounded-md bg-black overflow-hidden min-w-[480px]">
          <ul>
            <li className="border-t border-slate-200 p-3">A</li>
          </ul>
          <div className="font-semibold text-blue-600 border-t border-gray-300 py-2 px-4">
            See More
          </div>
        </div>
      )}
    </>
  );
};
