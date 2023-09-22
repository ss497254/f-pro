import { getConfig } from "../config";
import { Connection, WebSocketClient } from "./ws-client";

let client: WebSocketClient<Connection> | undefined;
let listner: (port: chrome.runtime.Port) => void;

export const getWSClient = () => {
  if (!client) throw new Error("client not intialized");

  return client;
};

export const initializeWSClient = (portName: string) => {
  if (client) cleanClient();

  console.log("Initialized");
  client = new WebSocketClient({
    getConnection: () =>
      new WebSocket(
        `${getConfig("WS_URL")}?access_token=${getConfig("token")}`
      ),
  });

  listner = function (port: chrome.runtime.Port) {
    if (port.name !== portName || !client) return;
    let active = true;

    client.onAny((event, data, ...x) => {
      if (active) port.postMessage({ event, data, extra: x });
    });

    client.connect();
    port.onDisconnect.addListener(() => {
      cleanClient();
      active = false;
    });
  };

  chrome.runtime.onConnect.addListener(listner);

  client.connect();
};

export const cleanClient = () => {
  if (client) {
    client.removeAllListeners();
    client.disconnect();

    client = undefined;
  }

  if (listner) chrome.runtime.onConnect.removeListener(listner);
};
