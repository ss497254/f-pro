import { useScrollToBottom } from "@app/hooks/useScrollToBottom";
import { Spinner } from "@app/ui/Spinner";
import { getMessageStore } from "@root/src/app/lib/getMessageStore";
import React, { useEffect } from "react";
import { useConfigStore } from "@app/stores/useConfigStore";
import { Button } from "../Buttons";
import { MessageBox } from "./MessageBox";

interface MessagesContainerProps extends React.PropsWithChildren {
  channel: string;
}

export const MessagesContainer: React.FC<MessagesContainerProps> = ({
  channel,
}) => {
  const { ref, scroll } = useScrollToBottom();

  return (
    <div
      className="flex-grow overflow-auto p-1.5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-surface2 [&::-webkit-scrollbar-thumb]:rounded"
      ref={ref}
    >
      <OldMessagesList channel={channel} />
      <NewMessagesList channel={channel} onUpdate={scroll} />
    </div>
  );
};

export const OldMessagesList: React.FC<{ channel: string }> = ({ channel }) => {
  const { username } = useConfigStore((state) => state.user)!;
  const [oldMessages, isLoading, loadOldMessages] = getMessageStore(channel)(
    (state) => [state.oldMessages, state.isLoading, state.loadOldMessages]
  );

  return (
    <>
      <div className="py-6 flex justify-center">
        {isLoading ? (
          <Spinner size={30} />
        ) : (
          <Button onClick={loadOldMessages}>Load previous messages</Button>
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
  onUpdate: () => void;
}> = ({ channel, onUpdate }) => {
  const { username } = useConfigStore((state) => state.user)!;
  const newMessages = getMessageStore(channel)((state) => state.newMessages);

  useEffect(onUpdate, [newMessages]);

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
