import { NotificationIcon } from "@root/src/app/icons";
import React, { useState } from "react";
import { NotificationsList } from "@app/ui/Notifications/NotificationsList";

interface NotificationsDropdownProps extends React.PropsWithChildren {}

export const NotificationsDropdown: React.FC<
  NotificationsDropdownProps
> = ({}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <>
      <button
        className="p-1.5 hover:bg-zinc-900 transition duration-150"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <NotificationIcon size={15} />
      </button>
      {dropdownOpen && (
        <div className="z-50 absolute border border-zinc-800 top-8 left-16 p-2 pr-1 rounded-md overflow-y-scroll break-words [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-zinc-900 [&::-webkit-scrollbar-thumb]:rounded-sm bg-black w-[360px] max-h-[360px]">
          <NotificationsList />
        </div>
      )}
    </>
  );
};
