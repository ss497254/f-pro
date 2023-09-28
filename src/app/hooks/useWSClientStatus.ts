import { getPort } from "app/lib/port";
import { useEffect, useState } from "react";

export const useWSClientStatus = () => {
  const [status, setStatus] = useState("");
  useEffect(() => {
    const port = getPort();
    const listner = (x: any) => {
      if (x.event === "state") setStatus(x.data.status);
    };

    port.onMessage.addListener(listner);
    return () => port.onMessage.removeListener(listner);
  }, []);

  return status;
};
