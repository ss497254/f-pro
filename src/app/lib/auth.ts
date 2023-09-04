import { useConfigStore } from "../stores/useConfigStore";
import { startScript, stopScript } from "./keep-sw-alive";
import { connectPort, disconnectPort } from "./port";

export const handleLogin = async ({ u, p }: any) => {
  const res = await chrome.runtime.sendMessage({ type: "login", u, p });

  if (res.type === "success") {
    useConfigStore.getState().update("user", res.user);
    connectPort(res.port);
    startScript();

    return;
  }

  throw new Error(res?.message || "Login error");
};

export const handleLogout = () => {
  useConfigStore.getState().update("user", undefined);
  disconnectPort();
  stopScript();
};
