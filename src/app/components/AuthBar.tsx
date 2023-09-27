import { ContentBar } from "app/components/ContentBar";
import { LoginBar } from "app/components/LoginBar";
import { useConfigStore } from "app/stores/useConfigStore";
import { useNotificationStore } from "app/stores/useNotificationsStore";
import { ErrorBoundary } from "app/ui/ErrorBoundary";
import { BarNotification } from "app/ui/Notifications/BarNotification";
import { WSClientStatus } from "./WSClientStatus";

export function AuthBar() {
  const user = useConfigStore((state) => state.user);
  const addNotification = useNotificationStore(
    (state) => state.addNotification
  );

  return (
    <div className="pl-2 flex-grow flex items-center">
      <ErrorBoundary
        onError={(e, eInfo) =>
          addNotification({
            type: "error",
            content: e.message,
            extra: { eInfo, ...e },
          })
        }
        fallback={<div className="text-red-500">Something went wrong.</div>}
      >
        {user ? <ContentBar /> : <LoginBar />}
      </ErrorBoundary>
      <div className="flex-grow" />
      <BarNotification />
      {user && <WSClientStatus />}
    </div>
  );
}
