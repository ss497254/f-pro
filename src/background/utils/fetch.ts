import { API_URL } from "../constants";
import { sleep } from "./sleep";

export interface ResponseType<T> {
  success: boolean;
  data: T;
  message?: string;
}

export const Cfetch = async <T>(
  input: string,
  init?: RequestInit | undefined
) => {
  const res = await fetch(API_URL + input, {
    ...init,
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  let output: ResponseType<T>;

  if (res.headers.get("Content-Type")?.includes("application/json"))
    output = await res.json();
  else throw new Error(await res.text());

  if (res.ok) {
    return output;
  }

  throw new Error(output.message || "Some error occured.");
};

export const Rfetch = async <T>(
  input: string,
  retry = 3,
  init?: RequestInit | undefined
) => {
  let error;
  for (let i = 1; i <= retry; i++) {
    try {
      return await Cfetch<T>(input, init);
    } catch (err) {
      if (i < retry) await sleep(1000);
      else error = err;
    }
  }

  console.warn(error);
  throw error;
};
