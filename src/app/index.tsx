import refreshOnUpdate from "virtual:reload-on-update-in-view";
refreshOnUpdate("app");

import { createRoot } from "react-dom/client";
import Main from "./components/Main";
import { isScriptInjected } from "./lib/is-script-injected";
import { attachTwindStyle } from "@src/shared/style/twind";
import { keyboardListner } from "./lib/keyboard-listner";
import { stopEventPropagation } from "./lib/stop-event-propagation";

isScriptInjected();

const root = document.createElement("div");

const shadowRoot = root.attachShadow({ mode: "closed" });
const rootIntoShadow = document.createElement("div");
const listner = keyboardListner(rootIntoShadow);

rootIntoShadow.style.position = "absolute";
rootIntoShadow.style.zIndex = "2147483647";
rootIntoShadow.style.top = "0";
rootIntoShadow.style.left = "0";
rootIntoShadow.style.right = "0";

rootIntoShadow.onkeydown = (e) => {
  listner(e);
  stopEventPropagation(e);
};
rootIntoShadow.onkeyup = stopEventPropagation;
rootIntoShadow.onclick = (e) => e.stopPropagation();

document.addEventListener("keydown", listner);

shadowRoot.appendChild(rootIntoShadow);
document.body.append(root);

attachTwindStyle(rootIntoShadow, shadowRoot);

const Root = createRoot(rootIntoShadow);
Root.render(<Main />);
