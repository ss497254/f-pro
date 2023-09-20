import React, { useState } from "react";
import { ChatScreen } from "../ChatScreen";
import { ZonicIcon } from "../../icons";

interface ChannelDropdownProps extends React.PropsWithChildren {
  channel: string;
  leftOffset?: number;
}

export const ChannelDropdown: React.FC<ChannelDropdownProps> = ({
  channel,
  leftOffset = 10,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <>
      <button
        className="p-1.5 hover:bg-surface2 transition duration-150"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <ZonicIcon />
      </button>
      {dropdownOpen && (
        <ChatScreen
          channel={channel}
          style={{ left: leftOffset }}
          className="z-50 fixed border border-surface3 top-8 rounded-md resize bg-surface1 overflow-hidden min-w-[350px] min-h-[240px] w-[360px] h-[360px]"
        />
      )}
    </>
  );
};
