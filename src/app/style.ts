import { setDarkMode } from "./lib/change-style";

export const addStyles = (element: HTMLDivElement) => {
  setDarkMode();

  element.style.position = "absolute";
  element.style.zIndex = "2147483647";
  element.style.top = "0";
  element.style.left = "0";
  element.style.right = "0";
};
