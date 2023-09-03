import { SettingsIcon } from "@root/src/app/icons";
import React, { useState } from "react";

interface SettingsDropdownProps extends React.PropsWithChildren {}

export const SettingsDropdown: React.FC<SettingsDropdownProps> = ({}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <>
      <button
        className="p-1.5 hover:bg-zinc-900 transition duration-150"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <SettingsIcon size={15} />
      </button>
      {dropdownOpen && (
        <div className="z-50 absolute border border-zinc-800 top-8 left-24 rounded-md bg-black overflow-hidden w-[360px]">
          Settings
        </div>
      )}
    </>
  );
};
