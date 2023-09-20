import { StoreApi, UseBoundStore, create } from "zustand";
import { IMessage } from "src/types/IMessage";
import { getPort } from "../lib/port";
import { Get, Post } from "../lib/chrome-fetch";

export interface IChannelToast {
  type: "error" | "info";
  content: string;
}

export interface IMessageStore {
  newMessages: IMessage[];
  oldMessages: IMessage[];
  toasts: IChannelToast[];
  channel: string;
  isLoading: boolean;
  isSubmitting: boolean;
  sendMessage: (content: string) => Promise<boolean>;
  addMessage: (message: IMessage, override?: boolean) => void;
  loadOldMessages: () => Promise<void>;
  clearMessages: () => void;
}

const ChannelStoreMap = new Map<
  string,
  UseBoundStore<StoreApi<IMessageStore>>
>();

export const getChannelStore = (channel: string) => {
  if (ChannelStoreMap.has(channel)) return ChannelStoreMap.get(channel)!;

  const port = getPort();

  const store = create<IMessageStore>()((set, get) => ({
    channel,
    isLoading: false,
    toasts: [],
    isSubmitting: false,
    newMessages: [],
    oldMessages: [],

    sendMessage: async (content) => {
      set({ isSubmitting: true });

      const res = await Post<IMessage>("/chats/send-message", {
        channel,
        content,
      });

      if (res.success) {
        res.data.delivering = true;
        get().addMessage(res.data);

        return true;
      }

      set({ isSubmitting: false });
      return false;
    },

    addMessage: async (message, override) => {
      const { newMessages } = get();

      let idx = newMessages.findLastIndex(
        (m) => m.timestamp === message.timestamp
      );

      if (idx === -1)
        return set({
          isSubmitting: false,
          newMessages: [...newMessages, message],
        });

      if (override)
        return set({
          isSubmitting: false,
          newMessages: newMessages.map((value, _idx) => {
            if (_idx === idx) return message;
            else return value;
          }),
        });

      return set({ isSubmitting: false });
    },

    loadOldMessages: async () => {
      set({ isLoading: true });

      const { oldMessages } = get();
      const res = await Get<IMessage[]>(
        `/chats/channels/${channel}/messages?cursor=${
          oldMessages[0]?.timestamp || new Date().getTime()
        }`
      );

      if (res.success) {
        return set({
          isLoading: false,
          oldMessages: res.data.reverse().concat(oldMessages),
        });
      }

      set({ isLoading: false });
    },

    clearMessages: () =>
      set({
        newMessages: [],
        oldMessages: [],
        isSubmitting: false,
        isLoading: false,
      }),
  }));

  port.onMessage.addListener(({ event, data: { message } }) => {
    if (event === channel) {
      store.getState().addMessage(message, true);
    }
  });

  ChannelStoreMap.set(channel, store);

  return store;
};

export const clearChannelStores = () => ChannelStoreMap.clear();
