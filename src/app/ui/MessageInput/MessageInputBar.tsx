import { SendIcon } from "app/icons";
import { clearLastScreenShot, getLastScreenShot } from "app/lib/screenshot";
import { getChannelStore } from "app/stores/getChannelStore";
import { IconButton } from "app/ui/Buttons/IconButton";
import React, { useEffect, useRef } from "react";
import { ExpandingTextArea } from "./ExpandingTextArea";
import { MessageAttachment } from "./MessageAttachment";

interface Props {
  channel: string;
}

export const MessageInputBar: React.FC<Props> = ({ channel }) => {
  const store = getChannelStore(channel);
  const sendMessage = store((state) => state.sendMessage);
  const isSubmitting = store((state) => state.isSubmitting);
  const hasAttachment = store((state) => state.hasAttachment);

  const ref = useRef<HTMLDivElement>(null);
  const isRunning = useRef(false);

  const onSubmit = async () => {
    if (isRunning.current || isSubmitting) return;

    isRunning.current = true;
    const content = ref.current!.innerText
      ? ref.current!.innerText
      : hasAttachment
      ? ""
      : "(empty)";

    if (
      await sendMessage(
        content,
        hasAttachment ? getLastScreenShot() : undefined
      )
    ) {
      if (hasAttachment) clearLastScreenShot();

      if (ref.current) {
        ref.current.innerText = "";
        ref.current.focus();
      }
    }
    isRunning.current = false;
  };

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        onSubmit();
      }
    };

    ref.current?.addEventListener("keydown", fn);
    return () => ref.current?.removeEventListener("keydown", fn);
  }, [hasAttachment]);

  return (
    <>
      {hasAttachment && <MessageAttachment />}
      <div className="flex items-end p-2 border-t border-surface2">
        <ExpandingTextArea ref={ref} />
        <IconButton
          size={40}
          onClick={isSubmitting ? undefined : onSubmit}
          loading={isSubmitting}
          className="!p-2 ml-3 duration-200"
        >
          <SendIcon size={24} />
        </IconButton>
      </div>
    </>
  );
};
