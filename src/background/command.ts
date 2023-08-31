import { verifyAndInstallScript } from "./inject-script";

chrome.commands.onCommand.addListener(async (command) => {
  console.log(`Command "${command}" triggered`);
  if (command === "inject") await verifyAndInstallScript();
});
