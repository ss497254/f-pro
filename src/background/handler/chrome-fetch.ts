import { Cfetch } from "../utils/fetch";

export const chromeFetch = async (
  { url, method, data }: { url: string; method?: string; data: any },
  sendResponse: (response?: any) => void
) => {
  try {
    const res = await Cfetch(url, {
      method,
      body: data ? JSON.stringify(data) : undefined,
    });

    sendResponse(res);
  } catch (e: any) {
    console.warn("Fetch error", e);
    sendResponse({ success: false, ...e });
  }
};
