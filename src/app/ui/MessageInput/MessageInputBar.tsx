import { SendIcon } from "@app/icons";
import { IconButton } from "@app/ui/Buttons/IconButton";
import { getMessageStore } from "@root/src/app/lib/getMessageStore";
import React, { useEffect, useRef } from "react";
import { Spinner } from "../Spinner";
import { ExpandingTextArea } from "./ExpandingTextArea";

interface Props {
  channel: string;
}

export const MessageInputBar: React.FC<Props> = ({ channel }) => {
  const [addMessage, isSubmitting] = getMessageStore(channel)((state) => [
    state.addMessage,
    state.isSubmitting,
  ]);

  const ref = useRef<HTMLDivElement>(null);

  const onSubmit = () => {
    if (isSubmitting) return;

    addMessage(ref.current?.innerText || "(empty)");

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
    <div className="flex items-end p-2 border-t border-surface2">
      <ExpandingTextArea ref={ref} />
      <IconButton
        size={40}
        onClick={onSubmit}
        disabled={isSubmitting}
        className="!p-2 ml-3 hover:rounded-full duration-200 h-fit"
      >
        {isSubmitting ? <Spinner /> : <SendIcon size={22} />}
      </IconButton>
    </div>
  );
};
