import Main from "app/components/Main";
import { isScriptAlive } from "app/lib/is-script-alive";
import { keyboardListner } from "app/lib/keyboard-listner";
import { stopEventPropagation } from "app/lib/stop-event-propagation";
import { useNotificationStore } from "app/stores/useNotificationsStore";
import { addStyles } from "app/style";
import { attachTwindStyle } from "src/shared/style/twind";
import { createRoot } from "react-dom/client";
import { setRootElement } from "./lib/root-element";

isScriptAlive();

const root = document.createElement("div");

const shadowRoot = root.attachShadow({ mode: "closed" });
const rootIntoShadow = document.createElement("div");
const listner = keyboardListner(rootIntoShadow);

setRootElement(rootIntoShadow);
addStyles(rootIntoShadow);

rootIntoShadow.onkeydown = (e) => {
  listner(e);
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

document.addEventListener("keydown", listner);

shadowRoot.appendChild(rootIntoShadow);
document.body.append(root);

attachTwindStyle(rootIntoShadow, shadowRoot);

const Root = createRoot(rootIntoShadow);
Root.render(<Main />);
