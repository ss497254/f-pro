export const isScriptAlive = () => {
  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if ("type" in message && message.type == "ping")
      sendResponse({ type: "pong" });
  });
};
