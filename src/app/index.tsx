import Main from "app/components/Main";
import { isScriptAlive } from "app/lib/is-script-alive";
import { keyboardListner } from "app/lib/keyboard-listner";
import { stopEventPropagation } from "app/lib/stop-event-propagation";
import { addStyles } from "app/style";
import { createRoot } from "react-dom/client";
import { attachTwindStyle } from "src/shared/style/twind";
import { setRootElement } from "./lib/root-element";
import { ErrorListner } from "./lib/error-listner";

isScriptAlive();

const root = document.createElement("div");

const shadowRoot = root.attachShadow({ mode: "closed" });
const rootIntoShadow = document.createElement("div");

setRootElement(rootIntoShadow);
addStyles(rootIntoShadow);

rootIntoShadow.onkeyup = stopEventPropagation;
rootIntoShadow.oncut = stopEventPropagation;
rootIntoShadow.oncopy = stopEventPropagation;
rootIntoShadow.onpaste = stopEventPropagation;
rootIntoShadow.onblur = stopEventPropagation;
rootIntoShadow.onfocus = stopEventPropagation;
rootIntoShadow.onmouseenter = stopEventPropagation;
rootIntoShadow.onmouseleave = stopEventPropagation;
rootIntoShadow.onmousemove = stopEventPropagation;
rootIntoShadow.onmouseout = stopEventPropagation;
rootIntoShadow.onbeforeinput = stopEventPropagation;
rootIntoShadow.oninput = stopEventPropagation;
rootIntoShadow.onchange = stopEventPropagation;
rootIntoShadow.onanimationstart = stopEventPropagation;
rootIntoShadow.onanimationcancel = stopEventPropagation;
rootIntoShadow.onanimationend = stopEventPropagation;
rootIntoShadow.onanimationiteration = stopEventPropagation;
rootIntoShadow.oncontextmenu = stopEventPropagation;
rootIntoShadow.ondblclick = stopEventPropagation;
rootIntoShadow.onload = stopEventPropagation;
rootIntoShadow.ongotpointercapture = stopEventPropagation;

rootIntoShadow.onkeydown = (e) => {
  keyboardListner(e);
  stopEventPropagation(e);
};
rootIntoShadow.onclick = (e) => {
  e.stopPropagation();
};
rootIntoShadow.onerror = (e) => {
  console.log("rootIntoShadow error", e);
  if (typeof e !== "string") stopEventPropagation(e);
};

window.addEventListener("unhandledrejection", ErrorListner);
window.addEventListener("error", ErrorListner);

document.addEventListener("keydown", keyboardListner);

shadowRoot.appendChild(rootIntoShadow);
document.body.append(root);

attachTwindStyle(rootIntoShadow, shadowRoot);

const Root = createRoot(rootIntoShadow);
Root.render(<Main />);
