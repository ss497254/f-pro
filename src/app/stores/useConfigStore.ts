import { create } from "zustand";
import { IUser } from "src/types/IUser";
import { IChannel } from "src/types/IChannel";

interface SentTextConfig {
  startAfter: number;
  delay: number;
  baseUrl: string;
}

interface ConfigState {
  imagePreviewEnabled: boolean;
  sendTextConfig: SentTextConfig;
  ssQuality: number;
  autoScroll: boolean;
  user?: IUser;
  channels?: IChannel[];
  opacity: number;

  update: (key: keyof Omit<ConfigState, "update">, value: any) => void;
}

export const useConfigStore = create<ConfigState>()((set) => ({
  imagePreviewEnabled: false,
  autoScroll: true,
  user: undefined,
  sendTextConfig: {
    startAfter: 10000,
    delay: 10,
    baseUrl: "http://localhost:51212",
  },
  opacity: 1,
  ssQuality: 50,
  update: (key, value) => set({ [key]: value }),
}));
