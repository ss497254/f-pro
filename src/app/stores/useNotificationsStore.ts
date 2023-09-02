import { create } from "zustand";
import { INotification } from "@app/types/INotification";

interface NotificationStoreState {
  notifications: INotification[];
  addNotification: (x: Omit<INotification, "timestamp">) => void;
  updateNotification: (x: INotification) => void;
  clearNotifications: () => void;
}

export const useNotificationStore = create<NotificationStoreState>()((set) => ({
  notifications: [],
  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        { ...notification, timestamp: new Date() },
      ],
    })),
  updateNotification: (t) =>
    set(({ notifications }) => ({
      notifications: notifications.map((x) => {
        if (x.timestamp !== t.timestamp) return x;

        return t;
      }),
    })),
  clearNotifications: () => {
    set({ notifications: [] });
  },
}));
