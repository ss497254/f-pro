import { setConfig } from "../config";
import { initializeWSClient } from "../lib/ws-client-store";
import { Cfetch } from "../utils/fetch";
import { getPortName } from "../utils/port";

interface LoginResponse {
  token: string;
  user: any;
}

export const handleLogin = async (
  username: string,
  password: string,
  sendResponse: (response?: any) => void
) => {
  try {
    const res = await Cfetch<LoginResponse>("/user/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });

    if (res.success) {
      const { user, token } = res.data;
      const port = getPortName();

      setConfig("token", token);
      initializeWSClient(port);

      return sendResponse({
        type: "success",
        user,
        port,
      });
    }

    throw new Error(res.message);
  } catch (e: any) {
    console.warn("Login error:", e);
    sendResponse({ type: "error", message: e.message });
  }
};
