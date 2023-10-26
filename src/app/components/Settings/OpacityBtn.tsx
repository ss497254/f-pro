import { useConfigStore } from "app/stores/useConfigStore";
import React from "react";

interface OpacityBtnProps extends React.PropsWithChildren {}

export const OpacityBtn: React.FC<OpacityBtnProps> = () => {
  const opacity = useConfigStore((state) => state.opacity);

  return (
    <div className="rounded-md flex space-x-1 [&>*]:p-2 overflow-hidden">
      <button
        className="bg-surface2 hover:bg-surface3 w-10"
        onClick={() =>
          useConfigStore.setState({
            opacity: Math.max(0.2, parseFloat((opacity - 0.1).toFixed(1))),
          })
        }
      >
        -
      </button>
      <div className="grow text-center bg-surface2">o: {opacity}</div>
      <button
        className="bg-surface2 hover:bg-surface3 w-10"
        onClick={() =>
          useConfigStore.setState({
            opacity: Math.min(1, parseFloat((opacity + 0.1).toFixed(1))),
          })
        }
      >
        +
      </button>
    </div>
  );
};
