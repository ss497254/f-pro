export const stopEventPropagation = (e: Event) => {
  e.stopImmediatePropagation();
  e.stopPropagation();
};
