export const screenshot = (
  { quality }: any,
  sendResponse: (response?: any) => void
) => {
  chrome.tabs
    .captureVisibleTab({ quality })
    .then((url) => sendResponse({ type: "success", url }))
    .catch(console.warn);
};
