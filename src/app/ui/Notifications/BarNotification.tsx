import React from "react";
import { useNotificationStore } from "@app/stores/useNotificationsStore";

interface BarNotificationProps extends React.PropsWithChildren {}

export const BarNotification: React.FC<BarNotificationProps> = () => {
  const notification = useNotificationStore((state) => state.notifications[0]);

  if (!notification) return null;
  if (typeof notification["content"] !== "string")
    notification.content = notification.content + "";

  return (
    <div
      title={notification.content}
      className={[
        "h-6 px-3 bg-zinc-900 w-80 flex items-center text-sm overflow-hidden",
        notification.type === "info" ? "text-blue-700" : "text-red-700",
      ].join(" ")}
    >
      {notification.content}
    </div>
  );
};
