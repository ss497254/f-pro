export const addStyles = (element: HTMLDivElement) => {
  element.style.setProperty("--surface1", "#0f0f0f");
  element.style.setProperty("--surface2", "#212121");
  element.style.setProperty("--surface3", "#313131");
  element.style.setProperty("--surface4", "#313131");
  element.style.setProperty("--surface5", "#414141");

  element.style.position = "absolute";
  element.style.zIndex = "2147483647";
  element.style.top = "0";
  element.style.left = "0";
  element.style.right = "0";
};
