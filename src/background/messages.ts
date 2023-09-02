import { handleLogin } from "./handler/login";

export const messageHandler = (
  message: any,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response?: any) => void
) => {
  console.log("Message listner, message:", JSON.stringify(message, null, 4));

  if (!("type" in message)) return;

  switch (message.type) {
    case "login": {
      handleLogin({
        username: message.u,
        password: message.p,
      })
        .then((user) => {
          sendResponse({ type: "sucesss", ...user });
        })
        .catch((e) => sendResponse({ type: "error", message: e.message }));

      console.log("returning");
      return true;
    }
    case "ping": {
      return sendResponse({ type: "pong" });
    }
    default:
      return sendResponse({ type: "error", content: "Invalid message type" });
  }
};

chrome.runtime.onMessage.addListener(messageHandler);
