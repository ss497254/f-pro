import React from "react";

import { CameraIcon, FullscreenIcon, ResetIcon } from "app/icons";
import { IconButton } from "app/ui/Buttons";
import { MessageInputBar } from "app/ui/MessageInput";
import { MessagesContainer } from "app/ui/Messages";
import { getChannelStore } from "app/stores/getChannelStore";

const DragFn = () => {
  let x = 20,
    y = 40;

  return (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();

    const element = e.currentTarget.parentNode?.parentNode?.parentElement;
    if (!element) return;

    element.style.left = x + "px";
    element.style.top = y + "px";

    x = e.clientX - 30;
    y = e.clientY - 30;
  };
};

interface ChatScreenProps extends React.HTMLAttributes<HTMLDivElement> {
  channel: string;
  className?: string;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({
  channel,
  className,
  ...props
}) => {
  const clearMessages = getChannelStore(channel)(
    (state) => state.clearMessages
  );

  return (
    <div className={["flex flex-col", className].join(" ")} {...props}>
      <div className="p-1 border-b border-surface3 flex items-center space-x-1">
        <div className="w-6 h-6 cursor-grab p-2" draggable onDrag={DragFn()}>
          <FullscreenIcon size={10} />
        </div>
        <h4 className="flex-grow">{channel}</h4>
        <IconButton>
          <CameraIcon size={20} />
        </IconButton>
        <IconButton onClick={clearMessages}>
          <ResetIcon size={15} />
        </IconButton>
      </div>
      <MessagesContainer channel={channel} />
      <MessageInputBar channel={channel} />
    </div>
  );
};
