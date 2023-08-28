import { createRoot } from "react-dom/client";
import Main from "./components/Main";
import refreshOnUpdate from "virtual:reload-on-update-in-view";
import { attachTwindStyle } from "@src/shared/style/twind";

refreshOnUpdate("pages/content");

const root = document.createElement("div");
const rootIntoShadow = document.createElement("div");

root.id = "ad-blocker";
root.draggable = true;
root.style.position = "absolute";
root.style.zIndex = "2147483647";
root.style.top = "0";
root.style.left = "0";
root.style.right = "0";

document.body.style.marginTop = "30px";

rootIntoShadow.id = "shadow-root";
rootIntoShadow.onkeydown = (e) => {
  e.stopImmediatePropagation();
  e.stopPropagation();
};
rootIntoShadow.onkeyup = (e) => {
  e.stopImmediatePropagation();
  e.stopPropagation();
};

const shadowRoot = root.attachShadow({ mode: "open" });

shadowRoot.appendChild(rootIntoShadow);
document.body.append(root);

attachTwindStyle(rootIntoShadow, shadowRoot);

const Root = createRoot(rootIntoShadow);

Root.render(<Main />);
