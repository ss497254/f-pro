import { SendTextBody } from "src/types";
import { Cfetch } from "../utils/fetch";

export const sendText = async (
  message: { baseUrl: string; body: SendTextBody },
  sendResponse: (response?: any) => void
) => {
  try {
    const res = await Cfetch("/send", {
      method: "POST",
      body: JSON.stringify(message.body),
      baseUrl: message.baseUrl,
    });

    if (res.success) {
      return sendResponse({
        type: "success",
        message: res.message,
      });
    }

    throw new Error(res.message);
  } catch (e: any) {
    console.warn("Login error:", e);
    sendResponse({ type: "error", message: e.message });
  }
};
