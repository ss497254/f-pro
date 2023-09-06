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
  element.style.setProperty("--surface2", "#222222");
  element.style.setProperty("--surface3", "#323232");
  element.style.setProperty("--surface4", "#404040");
  element.style.setProperty("--surface5", "#555555");
  element.style.setProperty("--color1", "#ffffff");
  element.style.setProperty("--color2", "#f0f0f0");
  element.style.setProperty("--color3", "#dddddd");
  element.style.setProperty("--color4", "#cccccc");
  element.style.setProperty("--color5", "#bbbbbb");
};

export const setLightMode = () => {
  const element = getRootElement();
  if (!element) return;

  element.style.setProperty("--surface1", "#ffffff");
  element.style.setProperty("--surface2", "#f0f0f0");
  element.style.setProperty("--surface3", "#dfdfdf");
  element.style.setProperty("--surface4", "#cccccc");
  element.style.setProperty("--surface5", "#aaaaaa");
  element.style.setProperty("--color1", "#111111");
  element.style.setProperty("--color2", "#2f2f2f");
  element.style.setProperty("--color3", "#323232");
  element.style.setProperty("--color4", "#404040");
  element.style.setProperty("--color5", "#555555");
};

export const setThemeOpacity = (n = 0.5) => {
  const element = getRootElement();
  if (!element) return;

  const variables = [
    "--surface1",
    "--surface2",
    "--surface3",
    "--surface4",
    "--surface5",
  ];

  for (const variable of variables) {
    element.style.setProperty(
      variable,
      element.style.getPropertyValue(variable).substring(0, 7) +
        (n * n).toString(16)
    );
  }
};
