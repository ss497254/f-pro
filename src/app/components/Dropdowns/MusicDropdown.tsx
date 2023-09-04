import { MusicIcon } from "@root/src/app/icons";
import React, { useState } from "react";
import { ChatScreen } from "../ChatScreen";

interface MusicDropdownProps extends React.PropsWithChildren {}

export const MusicDropdown: React.FC<MusicDropdownProps> = ({}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <>
      <button
        className="p-1.5 hover:bg-zinc-900 transition duration-150"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <MusicIcon size={15} />
      </button>
      {dropdownOpen && (
        <div
          className="z-50 fixed border border-zinc-800 top-8 left-10 rounded-md bg-black overflow-hidden min-w-[480px] min-h-[480px] w-[480px] h-[480px]"
          style={{ resize: "both" }}
        >
          <ChatScreen channel="music" />
        </div>
      )}
    </>
  );
};
