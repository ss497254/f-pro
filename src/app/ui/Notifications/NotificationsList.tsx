import React, { memo, useState } from "react";
import { useNotificationStore } from "../../stores/useNotificationsStore";
import { Button } from "../Buttons";

interface NotificationsListProps extends React.PropsWithChildren {}

export const NotificationsList: React.FC<NotificationsListProps> = () => {
  const { notifications } = useNotificationStore();
  const [limit, setLimit] = useState(5);
  const isEmpty = notifications.length === 0,
    hasMore = notifications.length < limit;

  return (
    <div>
      {isEmpty ? (
        "No notifications"
      ) : (
        <>
          {notifications.slice(0, limit).map(
            memo((notification, idx) => (
              <div key={idx} className="p-2">
                <p>{notification.content}</p>
                <span className="text-gray-800">
                  {notification.timestamp.toTimeString()}
                </span>
              </div>
            ))
          )}
          {hasMore && (
            <Button onClick={() => setLimit(limit + 5)}>Load more</Button>
          )}
        </>
      )}
    </div>
  );
};
