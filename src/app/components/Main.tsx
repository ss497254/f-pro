import { AuthBar } from "@app/components/AuthBar";
import { useIsOpenStore } from "@app/stores/useIsOpenStore";
import { CloseIcon } from "@app/icons";

export default function BottomBar() {
  const { open, toggleOpen } = useIsOpenStore();

  return (
    <div
      className="flex h-6 bg-surface1 text-base text-color1"
      style={{ width: open ? "100%" : "fit-content" }}
    >
      {open && <AuthBar />}
      <button className="h-6 w-6 p-1 hover:bg-surface2" onClick={toggleOpen}>
        <CloseIcon size={20} />
      </button>
    </div>
  );
}
