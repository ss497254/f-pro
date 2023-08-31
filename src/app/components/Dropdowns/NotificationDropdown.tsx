import { NotificationIcon } from "@root/src/app/icons";
import React, { useState } from "react";

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
        <div className="z-50 absolute  border border-zinc-800 top-8 right-16 rounded-md bg-black overflow-hidden w-[360px] min-h-[360px]">
          Notifications
        </div>
      )}
    </>
  );
};
