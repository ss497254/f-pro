import { AuthBar } from "app/components/AuthBar";
import { CloseIcon } from "app/icons";
import { useConfigStore } from "app/stores/useConfigStore";
import { useIsOpenStore } from "app/stores/useIsOpenStore";

export default function BottomBar() {
  const { open, toggleOpen } = useIsOpenStore();
  const opacity = useConfigStore((s) => s.opacity);

  return (
    <div
      className="flex h-6 bg-opacity-0 text-base text-color1"
      style={{ opacity, width: open ? "100%" : "fit-content" }}
    >
      {open && <AuthBar />}
      <button className="h-6 w-6 p-1 hover:bg-surface2" onClick={toggleOpen}>
        <CloseIcon size={20} />
      </button>
    </div>
  );
}
