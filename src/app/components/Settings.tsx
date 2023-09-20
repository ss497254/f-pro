import React from "react";
import { useConfigStore } from "app/stores/useConfigStore";
import { useNotificationStore } from "app/stores/useNotificationsStore";
import { handleLogout } from "app/lib/auth";
import { Button } from "app/ui/Buttons";

interface SettingsProps extends React.PropsWithChildren {}

export const Settings: React.FC<SettingsProps> = () => {
  const { user } = useConfigStore();
  const { addNotification } = useNotificationStore();

  return (
    <>
      <div className="px-2 pb-1">
        {user?.username}
        <p className="text-color3 text-xs mt-0.5">
          {user?.admin ? "admin" : "user"}
        </p>
      </div>
      <Button
        size="lg"
        onClick={() =>
          setTimeout(() => {
            throw new Error("Error from settings");
          }, 500)
        }
        className="w-full"
      >
        Throw Error
      </Button>
      <Button
        size="lg"
        onClick={() =>
          addNotification({
            type: Math.random() > 0.5 ? "error" : "info",
            content: "This is a random notification.",
          })
        }
        className="w-full"
      >
        Add Notification
      </Button>
      <Button onClick={handleLogout} btn="danger" size="lg" className="w-full">
        Logout
      </Button>
    </>
  );
};
