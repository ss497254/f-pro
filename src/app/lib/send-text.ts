import { useConfigStore } from "app/stores/useConfigStore";
import { useNotificationStore } from "app/stores/useNotificationsStore";

export const sendText = async (content: string) => {
  const { baseUrl, delay, startAfter } =
    useConfigStore.getState().sendTextConfig;

  const data = await chrome.runtime.sendMessage({
    type: "send_text",
    baseUrl,
    body: {
      startAfter,
      delay,
      text: content.split("\n"),
    },
  });

  if (data.type !== "success") {
    useNotificationStore.getState().addNotification({
      type: "error",
      content: data.message ?? "Data not sent",
    });
  }
};
