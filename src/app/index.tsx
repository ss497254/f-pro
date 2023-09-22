import Main from "app/components/Main";
import { isScriptAlive } from "app/lib/is-script-alive";
import { keyboardListner } from "app/lib/keyboard-listner";
import { stopEventPropagation } from "app/lib/stop-event-propagation";
import { useNotificationStore } from "app/stores/useNotificationsStore";
import { addStyles } from "app/style";
import { createRoot } from "react-dom/client";
import { attachTwindStyle } from "src/shared/style/twind";
import { setRootElement } from "./lib/root-element";

isScriptAlive();

const root = document.createElement("div");

const shadowRoot = root.attachShadow({ mode: "closed" });
const rootIntoShadow = document.createElement("div");

setRootElement(rootIntoShadow);
addStyles(rootIntoShadow);

rootIntoShadow.onkeydown = (e) => {
  keyboardListner(e);
  stopEventPropagation(e);
};
rootIntoShadow.onkeyup = stopEventPropagation;
rootIntoShadow.onclick = (e) => e.stopPropagation();

window.addEventListener("error", (e) => {
  useNotificationStore.getState().addNotification({
    type: "error",
    content: e.message,
    extra: {
      lineno: e.lineno,
      stack: e.error.stack,
    },
  });
  stopEventPropagation(e);
});

document.addEventListener("keydown", keyboardListner);

shadowRoot.appendChild(rootIntoShadow);
document.body.append(root);

attachTwindStyle(rootIntoShadow, shadowRoot);

const Root = createRoot(rootIntoShadow);
Root.render(<Main />);
