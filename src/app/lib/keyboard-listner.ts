export const keyboardListner = (rootIntoShadow: HTMLElement) => {
  let on = true;

  return (e: KeyboardEvent) => {
    if (e.altKey && e.keyCode === 55) {
      e.stopImmediatePropagation();
      e.stopPropagation();

      on = !on;
      if (on) {
        rootIntoShadow.style.opacity = "1";
        rootIntoShadow.style.zIndex = "2147483647";
      } else {
        rootIntoShadow.style.opacity = "0";
        rootIntoShadow.style.zIndex = "-2147483647";
      }

      return false;
    }
  };
};
