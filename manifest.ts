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
    default_popup: "src/popup/index.html",
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
      resources: ["assets/js/*.js", "assets/css/*.css"],
      matches: ["*://*/*"],
    },
  ],
};

export default manifest;
