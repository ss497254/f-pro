let active = true,
  timeout: NodeJS.Timeout;

const keepSWAlive = async () => {
  if (!active) return;

  const [type] = await chrome.runtime.sendMessage({ type: "ping" });

  console.log("keep sw alive", type);
  if (type !== "pong") {
    keepSWAlive();
    return;
  }

  timeout = setTimeout(keepSWAlive, 1000 * 20);
};

export const startScript = () => {
  active = true;
  keepSWAlive();
};

export const stopScript = () => {
  active = false;
  clearTimeout(timeout);
};
