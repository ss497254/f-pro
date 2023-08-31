import reloadOnUpdate from "virtual:reload-on-update-in-background-script";
reloadOnUpdate("service-worker");

const startTime = new Date();

console.log(`Service Worker is started on ${startTime.toLocaleString()}`);

chrome.commands
  .getAll()
  .then((data) => console.log("Registerd commands:", ...data));

const InjectedTabs = new Set<number>();
const onPageReload = (
  e: chrome.webNavigation.WebNavigationFramedCallbackDetails
) => {
  if (e.tabId) InjectedTabs.delete(e.tabId);
};

chrome.webNavigation.onCompleted.addListener(onPageReload);

const injectContentScript = async () => {
  const [res] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (!res || !res.id) {
    console.log("No active Tab found", { res });
    return;
  }

  if (InjectedTabs.has(res.id)) {
    console.log("Script already injected in page", res.title);
  } else {
    InjectedTabs.add(res.id);

    chrome.scripting.executeScript({
      target: { tabId: res.id },
      world: "ISOLATED",
      files: ["src/content-script.js"],
    });

    console.log("Script successfully injected in page", res.title);
  }
};

chrome.commands.onCommand.addListener(async (command) => {
  console.log(`Command "${command}" triggered`);
  if (command === "inject") await injectContentScript();
});