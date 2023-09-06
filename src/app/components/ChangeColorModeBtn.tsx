import { DarkModeIcon } from "../icons";
import { changeColorMode } from "../lib/change-style";

export const ChangeColorModeBtn = () => {
  return (
    <button
      className="p-1.5 hover:bg-surface2 transition duration-150"
      onClick={changeColorMode}
    >
      <DarkModeIcon size={16.5} />
    </button>
  );
};
