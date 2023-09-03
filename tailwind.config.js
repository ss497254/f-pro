/** @type {import('tailwindcss').Config} */

import config from "./twind.config";

module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{tsx,ts}"],
  theme: config.theme,
};
