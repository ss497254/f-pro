const config = {
  API_URL: "https://big-server.onrender.com/api",
  WS_URL: "wss://big-server.onrender.com/ws",
  SEND_TEXT_URL: "http://localhost:51212",
  token: "",
} as const;

type Config = typeof config;
type Key = keyof Config;

export const getConfig = <T = Config[Key]>(key: Key) => config[key] as T;

export const setConfig = (key: Key, value: any) =>
  ((config as any)[key] = value);
