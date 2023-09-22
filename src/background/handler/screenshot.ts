export const screenshot = (sendResponse: (response?: any) => void) => {
  chrome.tabs
    .captureVisibleTab({ quality: 20 })
    .then((url) => sendResponse({ type: "capture", url }))
    .catch(console.warn);
};
