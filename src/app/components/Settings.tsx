import { handleLogout } from "app/lib/auth";
import { useConfigStore } from "app/stores/useConfigStore";
import { Button } from "app/ui/Buttons";
import React from "react";

interface SettingsProps extends React.PropsWithChildren {}

export const Settings: React.FC<SettingsProps> = () => {
  const { user, update, imagePreviewEnabled } = useConfigStore();

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
        onClick={() => update("imagePreviewEnabled", !imagePreviewEnabled)}
        className="w-full"
      >
        Image preview ({imagePreviewEnabled ? "on" : "off"})
      </Button>
      <Button onClick={handleLogout} btn="danger" size="lg" className="w-full">
        Logout
      </Button>
    </>
  );
};
