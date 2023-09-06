import { DarkModeIcon } from "@app/icons";
import { changeColorMode } from "@app/lib/change-theme";

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
