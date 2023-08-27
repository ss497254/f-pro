import { useState, useCallback } from "react";
import { API_URL } from "../lib/constants";
import { ResponseType } from "../types/ResponseType";

export const useApi = <T>(
  method: "GET" | "POST" | "PUT",
  path: string,
  options?: RequestInit
) => {
  const [loading, setLoading] = useState(false);

  const run = useCallback(
    async ({ parameter = "", body = "" } = {}) => {
      setLoading(true);

      try {
        const res = await fetch(API_URL + path + parameter, {
          credentials: "include",
          method,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          ...options,
          ...(body && { body }),
        });

        let output: ResponseType<T>;

        if (res.headers.get("Content-Type")?.includes("application/json"))
          output = await res.json();
        else throw new Error(await res.text());

        if (res.ok) {
          setLoading(false);
          return output;
        }

        console.warn("API ERROR:", output);
        throw new Error(output.message || "Some error occured.");
      } catch (e) {
        setLoading(false);
        return { error: (e as Error).message } as ResponseType<T>;
      }
    },
    [path]
  );

  return { loading, run };
};
