import { useIsOpenStore } from "../stores/useIsOpenStore";
import { AuthBar } from "./AuthBar";
import { DraggableCloseBtn } from "./DraggableCloseBtn";

export default function BottomBar() {
  const { open } = useIsOpenStore();

  return (
    <div className="flex bg-black text-white" style={{ height: open ? 30 : 0 }}>
      <AuthBar />
      <DraggableCloseBtn />
    </div>
  );
}
