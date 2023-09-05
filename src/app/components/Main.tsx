import { AuthBar } from "@app/components/AuthBar";
import { useIsOpenStore } from "@app/stores/useIsOpenStore";
import { CloseIcon } from "../icons";

export default function BottomBar() {
  const { open, toggleOpen } = useIsOpenStore();

  return (
    <div
      className="flex h-6 bg-surface1 text-base text-white"
      style={{ width: open ? "100%" : "fit-content" }}
    >
      {open && <AuthBar />}
      <button
        className="h-6 w-6 p-1 bg-surface2 hover:bg-surface3"
        onClick={toggleOpen}
      >
        <CloseIcon size={20} />
      </button>
    </div>
  );
}
