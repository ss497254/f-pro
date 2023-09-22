import { toggleVisibility } from "./toggle-visibility";

export const keyboardListner = (e: KeyboardEvent) => {
  if (e.altKey && e.keyCode === 55) {
    e.stopImmediatePropagation();
    e.stopPropagation();

    toggleVisibility();
    return false;
  }
};
