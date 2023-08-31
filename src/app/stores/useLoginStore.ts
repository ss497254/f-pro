import { create } from "zustand";

interface LoginState {
  loggedIn: boolean;
  toggleLoggedIn: () => void;
}

export const useLoginStore = create<LoginState>()((set) => ({
  loggedIn: false,
  toggleLoggedIn: () => set(({ loggedIn }) => ({ loggedIn: !loggedIn })),
}));
