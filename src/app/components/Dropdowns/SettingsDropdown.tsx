import { SettingsIcon } from "src/app/icons";
import React, { useState } from "react";
import { Settings } from "../Settings";

interface SettingsDropdownProps extends React.PropsWithChildren {}

export const SettingsDropdown: React.FC<SettingsDropdownProps> = ({}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <>
      <button
        className="p-1.5 hover:bg-surface2 transition duration-150"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <SettingsIcon size={15} />
      </button>
      {dropdownOpen && (
        <div className="z-50 absolute border border-surface3 top-8 left-24 rounded-xl p-2 space-y-2 bg-surface1 overflow-hidden w-[240px]">
          <Settings />
        </div>
      )}
    </>
  );
};
