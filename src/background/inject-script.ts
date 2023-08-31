export const InjectedTabs = new Set<number>();

export const injectContentScript = async (res: chrome.tabs.Tab) => {
  chrome.scripting.executeScript({
    target: { tabId: res.id! },
    world: "ISOLATED",
    files: ["src/content-script.js"],
  });

  InjectedTabs.add(res.id!);
  console.log(`Script successfully injected in page "${res.title}"`);
};

export const verifyAndInstallScript = async () => {
  const [res] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (!res || !res.id) {
    console.log("No active Tab found", { res });
    return;
  }

  console.log("Checking for existing scripts");
  const timeout = setTimeout(injectContentScript, 2000, res);

  try {
    await chrome.tabs.sendMessage(res.id, { type: "ping" });
    clearTimeout(timeout);
    console.log(`Script already injected in page "${res.title}"`);
  } catch {}
};

const removeTabOnPageReload = (
  e: chrome.webNavigation.WebNavigationFramedCallbackDetails
) => {
  if (e.tabId) InjectedTabs.delete(e.tabId);
};

chrome.webNavigation.onCompleted.addListener(removeTabOnPageReload);
