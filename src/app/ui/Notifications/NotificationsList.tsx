import React, { useState } from "react";
import { useNotificationStore } from "../../stores/useNotificationsStore";
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
        <div key={idx} className="p-2 border-b border-zinc-900">
          <p className="pb-1">{notification.content}</p>
          {notification.extra && (
            <p className="pb-1 text-sm text-gray-200">
              {JSON.stringify(notification.extra)}
            </p>
          )}
          <span className="text-gray-300 text-xs">
            {notification.timestamp.toTimeString()}
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
