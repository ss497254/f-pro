import { ContentBar } from "@app/components/ContentBar";
import { LoginBar } from "@app/components/LoginBar";
import { useConfigStore } from "../stores/useConfigStore";

export function AuthBar() {
  const user = useConfigStore((state) => state.user);

  return (
    <div className="px-2 flex-grow bg-black text-white">
      {user ? <ContentBar /> : <LoginBar />}
    </div>
  );
}
