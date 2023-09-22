import React, { useState } from "react";
import { ChatScreen } from "../ChatScreen";
import { ZonicIcon } from "../../icons";

interface ChannelDropdownProps extends React.PropsWithChildren {
  channel: string;
}

export const ChannelDropdown: React.FC<ChannelDropdownProps> = ({
  channel,
}) => {
  const [left, setLeft] = useState(-1);

  return (
    <>
      <button
        className="p-1.5 hover:bg-surface2 transition duration-150"
        onClick={(e) => setLeft(left === -1 ? e.clientX : -1)}
      >
        <ZonicIcon />
      </button>
      {left !== -1 && (
        <ChatScreen
          channel={channel}
          style={{ left }}
          className="z-50 fixed border border-surface3 top-8 rounded-xl resize bg-surface1 overflow-hidden min-w-[350px] min-h-[240px] w-[360px] h-[360px]"
        />
      )}
    </>
  );
};
