import { useWSClientStatus } from "app/hooks/useWSClientStatus";
import React from "react";

interface WSClientStatusProps extends React.PropsWithChildren {}

const StatusColorMap: Record<string, string> = {
  connected: "bg-emerald-500",
  resolving: "bg-orange-500 animate-pulse",
  connecting: "bg-orange-500",
  closed: "bg-red-500",
};

export const WSClientStatus: React.FC<WSClientStatusProps> = () => {
  const status = useWSClientStatus();

  return (
    <button
      className="p-1.5 hover:bg-surface2 transition duration-150"
      onClick={() => chrome.runtime.sendMessage({ type: "reconnect" })}
    >
      <div
        className={[
          "h-3 w-3 rounded-full",
          StatusColorMap[status] ?? "bg-slate-500",
        ].join(" ")}
      />
    </button>
  );
};
