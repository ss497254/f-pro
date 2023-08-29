import React, { useRef } from "react";
import { useIsOpenStore } from "../stores/useIsOpenStore";

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
      className="absolute h-6 w-6 top-0 left-0 hover:bg-black text-xl"
      style={{
        left: open ? 0 : undefined,
        ...(open && {
          position: "relative",
          backgroundColor: "black",
          color: "white",
        }),
      }}
      onClick={toggleOpen}
    >
      O
    </button>
  );
};
