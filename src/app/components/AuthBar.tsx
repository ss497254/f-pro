import { ContentBar } from "@app/components/ContentBar";
import { LoginBar } from "@app/components/LoginBar";
import { useConfigStore } from "../stores/useConfigStore";
import { BarNotification } from "../ui/Notifications/BarNotification";

export function AuthBar() {
  const user = useConfigStore((state) => state.user);

  return (
    <div className="px-2 flex-grow flex justify-between bg-black text-white">
      {user ? <ContentBar /> : <LoginBar />}
      <BarNotification />
    </div>
  );
}
