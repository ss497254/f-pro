import { handleLogin } from "./handler/login";
import { chromeFetch } from "./utils/chrome-fetch";
import { loadScript } from "./utils/load-script";

export const messageHandler = (
  message: any,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response?: any) => void
) => {
  console.log("Message listner, message:", JSON.stringify(message, null, 4));

  if (!("type" in message)) return;

  switch (message.type) {
    case "fetch": {
      chromeFetch(message, sendResponse);

      return true;
    }
    case "login": {
      handleLogin(message.u, message.p, sendResponse);

      return true;
    }
    case "ping": {
      return sendResponse({ type: "pong" });
    }
    case "load_script": {
      if (!sender.tab || !sender.tab.id || !("file" in message)) return;

      loadScript(sender.tab.id, message.file);

      return true;
    }
    default:
      return sendResponse({ type: "error", content: "Invalid message type" });
  }
};

chrome.runtime.onMessage.addListener(messageHandler);
