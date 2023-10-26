import { useConfigStore } from "app/stores/useConfigStore";
import React from "react";

interface ScreenshotQualityBtnProps extends React.PropsWithChildren {}

export const ScreenshotQualityBtn: React.FC<ScreenshotQualityBtnProps> = () => {
  const quality = useConfigStore((state) => state.ssQuality);

  return (
    <div className="rounded-md flex space-x-1 [&>*]:p-2 overflow-hidden">
      <button
        className="bg-surface2 hover:bg-surface3 w-10"
        onClick={() =>
          useConfigStore.setState({
            ssQuality: Math.max(20, quality - 1),
          })
        }
      >
        -
      </button>
      <div className="grow text-center bg-surface2">ss-q: {quality}</div>
      <button
        className="bg-surface2 hover:bg-surface3 w-10"
        onClick={() =>
          useConfigStore.setState({
            ssQuality: Math.min(80, quality + 1),
          })
        }
      >
        +
      </button>
    </div>
  );
};
