export const loadScript = (
  { tab }: chrome.runtime.MessageSender,
  file: string
) => {
  if (tab && tab.id && file) {
    const tabId = tab.id;

    chrome.scripting.executeScript({
      target: { tabId },
      injectImmediately: true,
      files: [file],
    });
  }
};
