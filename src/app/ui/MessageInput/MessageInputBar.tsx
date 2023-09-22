import { CloseIcon, SendIcon } from "app/icons";
import { clearLastScreenShot, getLastScreenShot } from "app/lib/screenshot";
import { getChannelStore } from "app/stores/getChannelStore";
import { IconButton } from "app/ui/Buttons/IconButton";
import React, { useEffect, useRef } from "react";
import { Button } from "../Buttons";
import { ExpandingTextArea } from "./ExpandingTextArea";

interface Props {
  channel: string;
}

export const MessageInputBar: React.FC<Props> = ({ channel }) => {
  const store = getChannelStore(channel);
  const sendMessage = store((state) => state.sendMessage);
  const isSubmitting = store((state) => state.isSubmitting);
  const hasAttachment = store((state) => state.hasAttachment);

  const ref = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const isRunning = useRef(false);

  const onSubmit = async () => {
    if (isRunning.current || isSubmitting) return;

    isRunning.current = true;
    await sendMessage(
      ref.current?.innerText || "(empty)",
      hasAttachment ? "#" : undefined
    );
    if (hasAttachment) clearLastScreenShot();
    isRunning.current = false;

    if (ref.current) {
      ref.current.innerText = "";
      ref.current.focus();
    }
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
  }, []);

  return (
    <>
      {hasAttachment && (
        <div className="bg-surface3">
          <img
            key={clearLastScreenShot.toString()}
            ref={imageRef}
            className="border border-surface4 max-h-96 mx-auto"
          ></img>
          <div className="py-1 px-2 flex justify-between items-center">
            <Button
              className="hover:!bg-surface1"
              onClick={() => {
                imageRef.current!.src = getLastScreenShot();
              }}
            >
              View attachment
            </Button>
            <IconButton onClick={clearLastScreenShot}>
              <CloseIcon size={15} />
            </IconButton>
          </div>
        </div>
      )}
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
