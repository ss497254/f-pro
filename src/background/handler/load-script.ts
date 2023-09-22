export const loadScript = (tabId: number, file: string) => {
  chrome.scripting.executeScript({
    target: { tabId },
    injectImmediately: true,
    files: [file],
  });
};
