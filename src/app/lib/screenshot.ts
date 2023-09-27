import { getChannelStore } from "app/stores/getChannelStore";
import { toggleVisibility } from "./toggle-visibility";

let lastScreenshot = "";
export let clearLastScreenShot = () => {};

export const takeScreenShot = async (channel: string) => {
  toggleVisibility();

  await new Promise((res) => setTimeout(res, 500));

  const data = await chrome.runtime.sendMessage({ type: "capture" });
  if (data.type === "capture" && data.url) {
    clearLastScreenShot();
    lastScreenshot = data.url;

    queueMicrotask(() =>
      getChannelStore(channel).setState({ hasAttachment: true })
    );
    clearLastScreenShot = () => {
      lastScreenshot = "";
      getChannelStore(channel).setState({ hasAttachment: false });
    };
  }

  toggleVisibility();
};

export const getLastScreenShot = () => lastScreenshot;
