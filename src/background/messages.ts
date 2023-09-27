import { handleLogin } from "./handler/login";
import { screenshot } from "./handler/screenshot";
import { chromeFetch } from "./handler/chrome-fetch";
import { loadScript } from "./handler/load-script";
import { getWSClient } from "./lib/ws-client-store";

export const messageHandler = (
  message: any,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response?: any) => void
) => {
  console.log("Message listner, message:", JSON.stringify(message, null, 4));

  if (!("type" in message)) return;

  switch (message.type) {
    case "ping": {
      return sendResponse({ type: "pong" });
    }
    case "reconnect": {
      return getWSClient().reconnect();
    }
    case "fetch": {
      chromeFetch(message, sendResponse);

      return true;
    }
    case "login": {
      handleLogin(message.u, message.p, sendResponse);

      return true;
    }
    case "capture": {
      screenshot(sendResponse);

      return true;
    }
    case "load_script": {
      loadScript(sender, message.file);

      return true;
    }
    default:
      return sendResponse({ type: "error", content: "Invalid message type" });
  }
};

chrome.runtime.onMessage.addListener(messageHandler);
