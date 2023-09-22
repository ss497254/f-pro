import React, { useState } from "react";
import { useNotificationStore } from "app/stores/useNotificationsStore";
import { Button } from "../Buttons";

interface NotificationsListProps extends React.PropsWithChildren {}

export const NotificationsList: React.FC<NotificationsListProps> = () => {
  const { notifications } = useNotificationStore();
  const [limit, setLimit] = useState(5);
  const isEmpty = notifications.length === 0,
    hasMore = notifications.length > limit;

  if (isEmpty) return <div className="text-center py-12">No notifications</div>;

  return (
    <>
      {notifications.slice(0, limit).map((notification, idx) => (
        <div
          key={idx}
          className={[
            "p-2 border-b border-surface3 overflow-x-hidden",
            notification.type === "error" ? "bg-red-500/40" : "bg-blue-500/40",
          ].join(" ")}
        >
          <p className="pb-1">{notification.content}</p>
          {notification.extra && (
            <p className="pb-1 text-sm text-color2 break-words whitespace-pre-wrap">
              {JSON.stringify(notification.extra, null, 4)}
            </p>
          )}
          <span className="text-color3 text-xs">
            {notification.timestamp.toString().substring(0, 24)}
          </span>
        </div>
      ))}
      {hasMore && (
        <Button onClick={() => setLimit(limit + 5)} className="mx-auto mt-2">
          Load more
        </Button>
      )}
    </>
  );
};
