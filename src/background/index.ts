import reloadOnUpdate from "virtual:reload-on-update-in-background-script";
reloadOnUpdate("background");

import "./command";
import "./inject-script";
import "./messages";

export const startTime = new Date();

console.log(`Service Worker is started on ${startTime.toLocaleString()}`);

chrome.commands
  .getAll()
  .then((data) =>
    console.log("Registerd commands:", JSON.stringify(data, null, 4))
  );
