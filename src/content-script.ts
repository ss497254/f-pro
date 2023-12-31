// @ts-nocheck
if (__webpack_public_path__) {
  __webpack_public_path__ = chrome.runtime.getURL("");

  if (module.hot) {
    require("webpack/hot/dev-server");

    require("webpack-dev-server/client?hot=true&protocol=ws&hostname=localhost&port=9999");
  }
}
if (typeof process && process.env.NODE_ENV === "production") {
  require("src/utils/override-console");
}

import "./app";
