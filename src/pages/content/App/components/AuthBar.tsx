import { useIsOpenStore } from "../stores/useIsOpenStore";
import { useLoginStore } from "../stores/useLoginStore";
import { ContentBar } from "./ContentBar";
import { LoginBar } from "./LoginBar";

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
