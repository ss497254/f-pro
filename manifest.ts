import { rmSync, writeFileSync } from "fs";
import packageJson from "./package.json";

const manifest: chrome.runtime.ManifestV3 = {
  manifest_version: 3,
  name: packageJson.name,
  version: packageJson.version,
  description: packageJson.description,
  commands: {
    inject: {
      suggested_key: {
        default: "Alt+Shift+0",
      },
      description: "inject",
    },
  },
  permissions: ["storage", "scripting", "webNavigation"],
  background: {
    service_worker: "src/service-worker.js",
    type: "module",
  },
  action: {
    default_popup: "index.html",
    default_icon: "icon48.png",
  },
  icons: {
    "16": "icon16.png",
    "32": "icon32.png",
    "48": "icon48.png",
    "128": "icon128.png",
    "256": "icon256.png",
  },
  host_permissions: ["http://*/*", "https://*/*", "<all_urls>"],
  web_accessible_resources: [
    {
      resources: ["*.hot-update.json"],
      matches: ["*://*/*"],
    },
  ],
};

console.log("\x1b[1m\x1b[32m" + "Writing manifest.json to public");
writeFileSync("public/manifest.json", JSON.stringify(manifest));

console.log("Removing manifest.js" + "\x1b[0m");
rmSync("manifest.js");
