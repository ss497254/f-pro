import { ResponseType } from "src/types/ResponseType";

export const Get = async <T>(url: string): Promise<ResponseType<T>> => {
  return await chrome.runtime.sendMessage({ type: "fetch", url });
};

export const Post = async <T>(
  url: string,
  data: any
): Promise<ResponseType<T>> => {
  return await chrome.runtime.sendMessage({
    type: "fetch",
    url,
    data,
    method: "POST",
  });
};

export const Put = async <T>(
  url: string,
  data: any
): Promise<ResponseType<T>> => {
  return await chrome.runtime.sendMessage({
    type: "fetch",
    url,
    data,
    method: "PUT",
  });
};
