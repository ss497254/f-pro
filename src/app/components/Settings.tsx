import { handleLogout } from "app/lib/auth";
import { getRootElement } from "app/lib/root-element";
import { useConfigStore } from "app/stores/useConfigStore";
import { Button } from "app/ui/Buttons";
import React from "react";

interface SettingsProps extends React.PropsWithChildren {}

export const Settings: React.FC<SettingsProps> = () => {
  const root = getRootElement();
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
      <Button
        size="lg"
        onClick={(e) =>
          root.style.setProperty(
            "--surface1",
            (e.currentTarget.childNodes[0] as HTMLInputElement)?.value
          )
        }
        className="w-full"
      >
        <input
          className="mr-3 h-4"
          type="color"
          defaultValue={root.style.getPropertyValue("--surface1")}
        />
        Background
      </Button>
      <Button onClick={handleLogout} btn="danger" size="lg" className="w-full">
        Logout
      </Button>
    </>
  );
};
