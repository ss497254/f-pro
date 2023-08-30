import { useIsOpenStore } from "@app/stores/useIsOpenStore";
import { useLoginStore } from "@app/stores/useLoginStore";
import { ContentBar } from "@app/components/ContentBar";
import { LoginBar } from "@app/components/LoginBar";

export function AuthBar() {
  const { open } = useIsOpenStore();
  const { loggedIn } = useLoginStore();

  return (
    <div
      className="px-2 flex-grow bg-black text-white"
      style={{
        display: open ? "block" : "none",
      }}
    >
      {loggedIn ? <ContentBar /> : <LoginBar />}
    </div>
  );
}
