import refreshOnUpdate from "virtual:reload-on-update-in-view";
refreshOnUpdate("app");

import { createRoot } from "react-dom/client";
import Main from "./components/Main";
import { attachTwindStyle } from "@src/shared/style/twind";

const root = document.createElement("div");
const rootIntoShadow = document.createElement("div");

root.draggable = true;
root.style.position = "absolute";
root.style.zIndex = "2147483647";
root.style.top = "0";
root.style.left = "0";
root.style.right = "0";

const hideFunction = (() => {
  let on = true;

  return (e: KeyboardEvent) => {
    if (e.altKey && e.keyCode === 55) {
      e.stopImmediatePropagation();
      e.stopPropagation();

      on = !on;
      if (on) {
        rootIntoShadow.style.opacity = "1";
        root.style.zIndex = "2147483647";
      } else {
        rootIntoShadow.style.opacity = "0";
        root.style.zIndex = "-2147483647";
      }

      return false;
    }
  };
})();

rootIntoShadow.id = "shadow-root";
rootIntoShadow.onkeydown = (e) => {
  hideFunction(e);
  e.stopImmediatePropagation();
  e.stopPropagation();
};
rootIntoShadow.onkeyup = (e) => {
  e.stopImmediatePropagation();
  e.stopPropagation();
};

document.addEventListener("keydown", hideFunction);

const shadowRoot = root.attachShadow({ mode: "open" });

shadowRoot.appendChild(rootIntoShadow);
document.body.append(root);

attachTwindStyle(rootIntoShadow, shadowRoot);

const Root = createRoot(rootIntoShadow);
Root.render(<Main />);
