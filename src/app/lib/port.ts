let port: chrome.runtime.Port;

export const connectPort = (name: string) => {
  port = chrome.runtime.connect({ name });
};

export const disconnectPort = () => {
  if (!port) throw new Error("Port is not initialized");

  port.disconnect();
};

export const getPort = () => {
  if (!port) throw new Error("Port is not initialized");

  return port;
};
