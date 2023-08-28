import { create } from "zustand";

interface IsOpenState {
  open: boolean;
  toggleOpen: () => void;
}

export const useIsOpenStore = create<IsOpenState>()((set) => ({
  open: false,
  toggleOpen: () => set(({ open }) => ({ open: !open })),
}));
