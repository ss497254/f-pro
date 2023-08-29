import React from "react";
import { SettingsDropdown } from "./SettingsDropdown";
import { ChatsDropdown } from "./ChatsDropdown";

interface ContentBarProps extends React.PropsWithChildren {}

export const ContentBar: React.FC<ContentBarProps> = () => {
  return (
    <div className="flex space-x-3">
      <ChatsDropdown />
      <div className="flex-grow" />
      <SettingsDropdown />
    </div>
  );
};
