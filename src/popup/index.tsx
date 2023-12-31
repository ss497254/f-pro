import React from "react";
import { createRoot } from "react-dom/client";
import Popup from "./Popup";
import { attachTwindStyle } from "src/shared/style/twind";

const appContainer = document.querySelector("#app");
if (!appContainer) {
  throw new Error("Can not find #app-container");
}

attachTwindStyle(appContainer, document);
const root = createRoot(appContainer);
root.render(<Popup />);
