import React, { useEffect, useState } from "react";
import { useNotificationStore } from "@app/stores/useNotificationsStore";

interface BarNotificationProps extends React.PropsWithChildren {}

export const BarNotification: React.FC<BarNotificationProps> = () => {
  const notification = useNotificationStore((state) => state.notifications[0]);
  const [hide, setHide] = useState(!notification);

  useEffect(() => {
    if (!notification) return;

    if (hide) setHide(!notification);
    const timeout = setTimeout(setHide, 5000, true);

    return () => {
      clearTimeout(timeout);
    };
  }, [notification]);

  if (hide) return null;

  return (
    <div
      title={notification.content}
      className={[
        "h-6 px-3 bg-zinc-900 w-80 flex items-center text-xs overflow-hidden",
        notification.type === "info" ? "text-blue-600" : "text-red-600",
      ].join(" ")}
    >
      {notification.content + ""}
    </div>
  );
};
