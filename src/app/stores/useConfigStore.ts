import { create } from "zustand";
import { IUser } from "@app/types/IUser";

interface ConfigState {
  user: IUser | undefined;
  update: (key: keyof Omit<ConfigState, "update">, value: any) => void;
}

export const useConfigStore = create<ConfigState>()((set) => ({
  user: { username: "ss497254", admin: true, permissions: [] },
  update: (key, value) => set({ [key]: value }),
}));
