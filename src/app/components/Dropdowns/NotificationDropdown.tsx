import { NotificationIcon } from "src/app/icons";
import React, { useState } from "react";
import { NotificationsList } from "app/ui/Notifications/NotificationsList";

interface NotificationsDropdownProps extends React.PropsWithChildren {}

export const NotificationsDropdown: React.FC<
  NotificationsDropdownProps
> = ({}) => {
  const [left, setLeft] = useState(-1);

  return (
    <>
      <button
        className="p-1.5 hover:bg-surface2 transition duration-150"
        onClick={(e) => setLeft(left === -1 ? e.clientX : -1)}
      >
        <NotificationIcon size={15} />
      </button>
      {left !== -1 && (
        <div
          className="z-50 absolute resize-x border border-surface3 top-8 p-2 pr-1 rounded-xl overflow-y-scroll break-words scroll-thin [&::-webkit-scrollbar-thumb]:rounded-sm bg-surface1 w-[360px] max-h-[480px]"
          style={{ left }}
        >
          <NotificationsList />
        </div>
      )}
    </>
  );
};
