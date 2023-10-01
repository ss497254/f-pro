import { create } from "zustand";
import { IUser } from "src/types/IUser";
import { IChannel } from "src/types/IChannel";

interface ConfigState {
  imagePreviewEnabled: boolean;
  user?: IUser;
  channels?: IChannel[];

  update: (key: keyof Omit<ConfigState, "update">, value: any) => void;
}

export const useConfigStore = create<ConfigState>()((set) => ({
  imagePreviewEnabled: false,
  user: undefined,
  update: (key, value) => set({ [key]: value }),
}));
