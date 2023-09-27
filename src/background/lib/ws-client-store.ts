import { getConfig } from "../config";
import { Connection, WebSocketClient } from "./ws-client";

let client: WebSocketClient<Connection> | undefined;
let chromePort: chrome.runtime.Port | undefined;
let portListner: ((port: chrome.runtime.Port) => void) | undefined;

export const getWSClient = () => {
  if (!client) throw new Error("client not intialized");

  return client;
};

export const initializeWSClient = (portName: string) => {
  cleanClient();
  console.log("Initializing...");

  client = new WebSocketClient({
    getConnection: () =>
      new WebSocket(
        `${getConfig("WS_URL")}?access_token=${getConfig("token")}`
      ),
  });

  portListner = function (port: chrome.runtime.Port) {
    if (port.name !== portName || !client) return;
    chromePort = port;
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

  chrome.runtime.onConnect.addListener(portListner);

  client.connect();
  console.log("Initialized");
};

export const cleanClient = () => {
  console.log("cleaning client");
  if (client) {
    console.log("removing ws-client");
    client.removeAllListeners();
    client.disconnect();

    client = undefined;
  }

  if (chromePort) {
    console.log("disconnect chromePort");
    chromePort.disconnect();
    chromePort = undefined;
  }

  if (portListner) {
    console.log("removing portListner");
    chrome.runtime.onConnect.removeListener(portListner);
    portListner = undefined;
  }
};
