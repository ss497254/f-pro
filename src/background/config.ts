const config = {
  API_URL: "http://localhost:8080/api",
  WS_URL: "ws://localhost:8080/ws",
  token: "",
} as const;

type Key = keyof typeof config;

export const getConfig = (key: Key) => config[key];

export const setConfig = (key: Key, value: any) =>
  // @ts-ignore
  (config[key] = value);
