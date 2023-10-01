import React from "react";

import { CameraIcon, FullscreenIcon, ResetIcon } from "app/icons";
import { IconButton } from "app/ui/Buttons";
import { MessageInputBar } from "app/ui/MessageInput";
import { MessagesContainer } from "app/ui/Messages";
import { getChannelStore } from "app/stores/getChannelStore";
import { takeScreenShot } from "app/lib/screenshot";
import { IChannel } from "src/types/IChannel";

interface ChatScreenProps extends React.HTMLAttributes<HTMLDivElement> {
  channel: IChannel;
  className?: string;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({
  channel: { name },
  className,
  ...props
}) => {
  const clearMessages = getChannelStore(name)((state) => state.clearMessages);

  return (
    <div className={["flex flex-col", className].join(" ")} {...props}>
      <div className="p-1 border-b border-surface3 flex items-center space-x-1">
        <div className="w-6 h-6 cursor-grab p-2" draggable onDrag={DragFn()}>
          <FullscreenIcon size={10} />
        </div>
        <h4 className="flex-grow">{name}</h4>
        <IconButton onClick={async () => await takeScreenShot(name)}>
          <CameraIcon size={20} />
        </IconButton>
        <IconButton onClick={clearMessages}>
          <ResetIcon size={15} />
        </IconButton>
      </div>
      <MessagesContainer channel={name} />
      <MessageInputBar channel={name} />
    </div>
  );
};

function DragFn() {
  let x = 20,
    y = 40;

  return (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();

    const element = e.currentTarget.parentNode?.parentElement;
    if (!element) return;

    element.style.left = x + "px";
    element.style.top = y + "px";

    x = e.clientX - 30;
    y = e.clientY - 30;
  };
}
