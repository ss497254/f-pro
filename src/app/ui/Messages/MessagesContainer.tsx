import { useScrollToBottom } from "app/hooks/useScrollToBottom";
import { getChannelStore } from "app/stores/getChannelStore";
import { useConfigStore } from "app/stores/useConfigStore";
import { Spinner } from "app/ui/Spinner";
import React from "react";
import { BlockButton } from "../Buttons";
import { MessageBox } from "./MessageBox";

interface MessagesContainerProps extends React.PropsWithChildren {
  channel: string;
}

export const MessagesContainer: React.FC<MessagesContainerProps> = ({
  channel,
}) => {
  const { scrollRef } = useScrollToBottom(channel);

  return (
    <div className="flex-grow overflow-auto p-1.5" ref={scrollRef}>
      <OldMessagesList channel={channel} />
      <NewMessagesList channel={channel} />
    </div>
  );
};

export const OldMessagesList: React.FC<{ channel: string }> = ({ channel }) => {
  const { username } = useConfigStore((state) => state.user)!;
  const store = getChannelStore(channel);
  const isLoading = store((state) => state.isLoading);
  const oldMessages = store((state) => state.oldMessages);
  const loadOldMessages = store((state) => state.loadOldMessages);

  return (
    <>
      <div className="py-6 flex justify-center">
        {isLoading ? (
          <Spinner size={30} />
        ) : (
          <BlockButton className="py-2 rounded-md" onClick={loadOldMessages}>
            Load previous messages
          </BlockButton>
        )}
      </div>
      {oldMessages.map((x) => (
        <MessageBox
          key={x.timestamp}
          dir={x.username === username ? "right" : "left"}
          {...x}
        />
      ))}
    </>
  );
};

export const NewMessagesList: React.FC<{
  channel: string;
}> = ({ channel }) => {
  const { username } = useConfigStore((state) => state.user)!;
  const newMessages = getChannelStore(channel)((state) => state.newMessages);

  return (
    <>
      {newMessages.map((x) => (
        <MessageBox
          key={x.timestamp}
          dir={x.username === username ? "right" : "left"}
          {...x}
        />
      ))}
    </>
  );
};
