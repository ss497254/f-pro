import { useRef, useState, useEffect } from "react";
import { getChannelStore } from "app/stores/getChannelStore";

export function useScrollToBottom(channel?: string) {
  // for auto-scroll
  let newMessages;
  if (channel)
    newMessages = getChannelStore(channel)((state) => state.newMessages);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);

  function scrollDomToBottom() {
    const dom = scrollRef.current;
    if (dom) {
      requestAnimationFrame(() => {
        setAutoScroll(true);
        dom.scrollTo(0, dom.scrollHeight);
      });
    }
  }

  useEffect(() => {
    if (autoScroll) {
      scrollDomToBottom();
    }
  }, [newMessages, autoScroll]);

  return {
    scrollRef,
    autoScroll,
    setAutoScroll,
    scrollDomToBottom,
  };
}
