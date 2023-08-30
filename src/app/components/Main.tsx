import { useIsOpenStore } from "@app/stores/useIsOpenStore";
import { AuthBar } from "@app/components/AuthBar";
import { DraggableCloseBtn } from "@app/components/DraggableCloseBtn";

export default function BottomBar() {
  const { open } = useIsOpenStore();

  return (
    <div className="flex" style={{ height: open ? 30 : 0 }}>
      <AuthBar />
      <DraggableCloseBtn />
    </div>
  );
}
