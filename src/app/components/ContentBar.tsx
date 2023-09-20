import { NotificationsDropdown } from "app/components/Dropdowns/NotificationDropdown";
import { SettingsDropdown } from "app/components/Dropdowns/SettingsDropdown";
import { useConfigStore } from "app/stores/useConfigStore";
import { ChannelDropdown } from "root/src/app/components/Dropdowns/ChannelDropdown";
import React from "react";
import { ChangeColorModeBtn } from "./ChangeColorModeBtn";

interface ContentBarProps extends React.PropsWithChildren {}

export const ContentBar: React.FC<ContentBarProps> = () => {
  const user = useConfigStore((state) => state.user)!;

  return (
    <div className="flex space-x-0.5">
      {user.permissions.map((permission, idx) => (
        <ChannelDropdown
          key={idx}
          channel={permission}
          leftOffset={(idx * 3.5 + 1) * 10}
        />
      ))}
      <NotificationsDropdown />
      <SettingsDropdown />
      <ChangeColorModeBtn />
    </div>
  );
};
