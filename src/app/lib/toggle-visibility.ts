import { getRootElement } from "./root-element";

let hide = false;

export const toggleVisibility = () => {
  const root = getRootElement();

  if (hide) {
    root.style.opacity = "1";
    root.style.zIndex = "2147483647";
  } else {
    root.style.opacity = "0";
    root.style.zIndex = "-2147483647";
  }

  hide = !hide;
};
