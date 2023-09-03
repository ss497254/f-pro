import React from "react";
import { useConfigStore } from "../stores/useConfigStore";
import { useNotificationStore } from "../stores/useNotificationsStore";

interface SettingsProps extends React.PropsWithChildren {}

export const Settings: React.FC<SettingsProps> = () => {
  const { update, user } = useConfigStore();
  const { addNotification } = useNotificationStore();
  return (
    <>
      <div className="px-2 pb-1">
        {user?.username}
        {user?.admin && <p className="text-gray-300 text-xs mt-0.5">Admin</p>}
      </div>
      <div
        onClick={() =>
          addNotification({
            type: Math.random() > 0.5 ? "error" : "info",
            content: "This is a random notification.",
          })
        }
        className="bg-zinc-900 rounded-md px-3 py-2 text-center"
      >
        New Notification
      </div>
      <div
        onClick={() => update("user", undefined)}
        className="bg-red-500 text-white rounded-md px-3 py-2 text-center"
      >
        Logout
      </div>
    </>
  );
};
