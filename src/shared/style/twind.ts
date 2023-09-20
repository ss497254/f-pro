import { twind, cssom, observe } from "@twind/core";
import config from "../../../twind.config";

const customStyles = `
::-webkit-scrollbar {
  width: 7.5px;
}

::-webkit-scrollbar-track {
  background-color: var(--surface2);
}

::-webkit-scrollbar-thumb {
  background-color: var(--surface3);
  border-radius: 10px;
}

.scroll-thin::-webkit-scrollbar {
  width: 5px;
}

.hide-scroll::-webkit-scrollbar-thumb {
  background-color: transparent;
}

.hide-scroll:hover::-webkit-scrollbar-thumb {
  background-color: var(--surface3);
}`;

export function attachTwindStyle<T extends { adoptedStyleSheets: any }>(
  observedElement: Element,
  documentOrShadowRoot: T
) {
  const sheet = cssom(new CSSStyleSheet());
  const styles = customStyles.split("\n\n");

  for (const style of styles) sheet.target.insertRule(style);

  const tw = twind(config, sheet);
  observe(tw, observedElement);
  documentOrShadowRoot.adoptedStyleSheets = [sheet.target];
}
