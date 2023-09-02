import { AuthBar } from "@app/components/AuthBar";
import { useIsOpenStore } from "@app/stores/useIsOpenStore";
import { CloseIcon } from "../icons";

export default function BottomBar() {
  const { open, toggleOpen } = useIsOpenStore();

  return (
    <div className="flex h-6">
      {open && <AuthBar />}
      <button
        className="h-6 w-6 p-1 bg-black hover:bg-zinc-900 text-white"
        onClick={toggleOpen}
      >
        <CloseIcon size={20} />
      </button>
    </div>
  );
}
