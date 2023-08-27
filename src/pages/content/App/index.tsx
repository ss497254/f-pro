import { createRoot } from "react-dom/client";
import App from "./BottomBar";
import refreshOnUpdate from "virtual:reload-on-update-in-view";
import { attachTwindStyle } from "@src/shared/style/twind";

refreshOnUpdate("pages/content");

const root = document.createElement("div");
const rootIntoShadow = document.createElement("div");

root.id = "ad-blocker";
rootIntoShadow.id = "shadow-root";

const area = window.innerWidth * 40;
const height = area > 16 * 1000 ? "40px" : "80px";

root.style.position = "relative";
root.style.zIndex = "2147483647";
root.style.bottom = "0";
root.style.right = "0";
root.style.height = height;

document.body.style.height = `calc(100vh - ${height})`;

const shadowRoot = root.attachShadow({ mode: "open" });

shadowRoot.appendChild(rootIntoShadow);
document.body.append(root);

attachTwindStyle(rootIntoShadow, shadowRoot);

const Root = createRoot(rootIntoShadow);

Root.render(<App />);
