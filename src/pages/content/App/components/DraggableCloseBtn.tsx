import React, { useRef } from "react";
import { useIsOpenStore } from "../stores/useIsOpenStore";
import { Button } from "../ui/Buttons";

interface DraggableCloseBtnProps extends React.PropsWithChildren {}

export const DraggableCloseBtn: React.FC<DraggableCloseBtnProps> = () => {
  const { open, toggleOpen } = useIsOpenStore();
  const secondLast = useRef(0);

  return (
    <Button
      btn="outline"
      draggable={!open}
      onDrag={(e) => {
        e.currentTarget.style.left = secondLast.current + "px";
        secondLast.current = Math.min(e.clientX, window.innerWidth / 2);
      }}
      className="absolute top-0 left-0 hover:bg-black"
      style={{ height: 30, width: 30, left: open ? 0 : undefined }}
      onClick={toggleOpen}
    >
      X
    </Button>
  );
};
