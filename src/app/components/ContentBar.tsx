import { NotificationsDropdown } from "app/components/Dropdowns/NotificationDropdown";
import { SettingsDropdown } from "app/components/Dropdowns/SettingsDropdown";
import { useConfigStore } from "app/stores/useConfigStore";
import React from "react";
import { ChannelDropdown } from "src/app/components/Dropdowns/ChannelDropdown";

interface ContentBarProps extends React.PropsWithChildren {}

export const ContentBar: React.FC<ContentBarProps> = () => {
  const channels = useConfigStore((state) => state.channels)!;

  return (
    <div className="flex space-x-0.5">
      {channels.map((channel, idx) => (
        <ChannelDropdown key={idx} channel={channel} />
      ))}
      <NotificationsDropdown />
      <SettingsDropdown />
    </div>
  );
};
