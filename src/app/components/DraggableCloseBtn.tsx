import React, { useRef } from "react";
import { useIsOpenStore } from "@app/stores/useIsOpenStore";
import { CloseIcon } from "@root/src/app/icons";

interface DraggableCloseBtnProps extends React.PropsWithChildren {}

export const DraggableCloseBtn: React.FC<DraggableCloseBtnProps> = () => {
  const { open, toggleOpen } = useIsOpenStore();
  const secondLast = useRef(0);

  return (
    <button
      draggable={!open}
      onDrag={(e) => {
        e.currentTarget.style.left = secondLast.current + "px";
        secondLast.current = Math.min(e.clientX, window.innerWidth / 2);
      }}
      className="absolute h-6 w-6 top-0 left-0 p-1 bg-black hover:bg-zinc-900 text-white"
      style={{
        left: open ? 0 : undefined,
        ...(open && {
          position: "relative",
          color: "white",
        }),
      }}
      onClick={toggleOpen}
    >
      <CloseIcon size={20} />
    </button>
  );
};
