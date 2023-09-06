import React from "react";
import { SettingsDropdown } from "@app/components/Dropdowns/SettingsDropdown";
import { ZonicDropdown } from "@root/src/app/components/Dropdowns/ZonicDropdown";
import { MusicDropdown } from "@root/src/app/components/Dropdowns/MusicDropdown";
import { NotificationsDropdown } from "@app/components/Dropdowns/NotificationDropdown";
import { useConfigStore } from "@app/stores/useConfigStore";
import { ChangeColorModeBtn } from "./ChangeColorModeBtn";

interface ContentBarProps extends React.PropsWithChildren {}

const PemissionToComponent: Record<string, React.FC<any>> = {
  zonic: ZonicDropdown,
  music: MusicDropdown,
};

export const ContentBar: React.FC<ContentBarProps> = () => {
  const user = useConfigStore((state) => state.user)!;

  return (
    <div className="flex space-x-0.5">
      {user.permissions.map((permission, idx) => {
        const Component = PemissionToComponent[permission];
        return <Component key={idx} />;
      })}
      <NotificationsDropdown />
      <SettingsDropdown />
      <ChangeColorModeBtn />
    </div>
  );
};
