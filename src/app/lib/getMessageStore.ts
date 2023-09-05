import { StoreApi, UseBoundStore, create } from "zustand";
import { IMessage } from "../types/IMessage";

export interface IMessageStore {
  newMessages: IMessage[];
  oldMessages: IMessage[];
  channel: string;
  isLoading: boolean;
  addMessage: (content: string) => void;
  clearMessages: () => void;
}

const MessageStoreMap = new Map<
  string,
  UseBoundStore<StoreApi<IMessageStore>>
>();

export const getMessageStore = (channel: string) => {
  if (MessageStoreMap.has(channel)) return MessageStoreMap.get(channel)!;

  const store = create<IMessageStore>()((set) => ({
    newMessages: [],
    channel,
    oldMessages: [],
    isLoading: false,
    addMessage: async (content) => {
      set({ isLoading: true });
      const newMessage: IMessage = {
        author: "Admin",
        content,
        timestamp: new Date().getTime(),
      };
      set((state) => ({
        newMessages: [...state.newMessages, newMessage],
        isLoading: false,
      }));
    },
    clearMessages: () =>
      set({ newMessages: [], oldMessages: [], isLoading: false }),
  }));

  MessageStoreMap.set(channel, store);

  return store;
};
