import { getRootElement } from "./root-element";

let isDarkMode = true;

export const changeColorMode = () => {
  const element = getRootElement();
  if (!element) return;

  if (isDarkMode) setLightMode();
  else setDarkMode();

  isDarkMode = !isDarkMode;
};

export const setDarkMode = () => {
  const element = getRootElement();
  if (!element) return;

  element.style.setProperty("--surface1", "#111111");
  element.style.setProperty("--surface2", "#2f2f2f");
  element.style.setProperty("--surface3", "#323232");
  element.style.setProperty("--surface4", "#404040");
  element.style.setProperty("--surface5", "#555555");
};

export const setLightMode = () => {
  const element = getRootElement();
  if (!element) return;

  element.style.setProperty("--surface1", "#ffffff");
  element.style.setProperty("--surface2", "#f2f2f2");
  element.style.setProperty("--surface3", "#dfdfdf");
  element.style.setProperty("--surface4", "#cccccc");
  element.style.setProperty("--surface5", "#aaaaaa");
};
