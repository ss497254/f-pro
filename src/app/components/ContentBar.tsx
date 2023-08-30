import React from "react";
import { SettingsDropdown } from "@app/components/Dropdowns/SettingsDropdown";
import { ChatsDropdown } from "@app/components/Dropdowns/ChatsDropdown";
import { ChatgptDropdown } from "@app/components/Dropdowns/ChatgptDropdown";
import { NotificationsDropdown } from "@app/components/Dropdowns/NotificationDropdown";

interface ContentBarProps extends React.PropsWithChildren {}

export const ContentBar: React.FC<ContentBarProps> = () => {
  return (
    <div className="flex space-x-0.5">
      <ChatsDropdown />
      <ChatgptDropdown />
      <div className="flex-grow" />
      <NotificationsDropdown />
      <SettingsDropdown />
    </div>
  );
};
