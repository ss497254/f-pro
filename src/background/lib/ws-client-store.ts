import { getConfig } from "../config";
import { Connection, WebSocketClient } from "./ws-client";

let client: WebSocketClient<Connection> | undefined;
let listner: (port: chrome.runtime.Port) => void;

export const getWSClient = () => {
  if (!client) throw new Error("client not intialized");

  return client;
};

export const initializeWSClient = (portName: string) => {
  if (client) return;

  console.log("Initialized");
  client = new WebSocketClient({
    getConnection: () =>
      new WebSocket(
        `${getConfig("WS_URL")}?access_token=${getConfig("token")}`
      ),
  });

  listner = function (port: chrome.runtime.Port) {
    if (port.name !== portName || !client) return;

    client.onAny((event, data, ...x) => {
      console.info(event, data, ...x, typeof x);
      port.postMessage({ event, data, extra: x });
    });

    client.connect();
    port.onDisconnect.addListener(cleanClient);
  };

  chrome.runtime.onConnect.addListener(listner);

  client.connect();
};

export const cleanClient = () => {
  if (client) {
    client.disconnect();
    client.removeAllListeners();

    client = undefined;
  }

  if (listner) chrome.runtime.onConnect.removeListener(listner);
};
