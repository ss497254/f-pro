import { ContentBar } from "@app/components/ContentBar";
import { LoginBar } from "@app/components/LoginBar";
import { useConfigStore } from "@app/stores/useConfigStore";
import { BarNotification } from "@app/ui/Notifications/BarNotification";
import { useNotificationStore } from "@app/stores/useNotificationsStore";
import { ErrorBoundary } from "@app/ui/ErrorBoundary";

export function AuthBar() {
  const user = useConfigStore((state) => state.user);
  const addNotification = useNotificationStore(
    (state) => state.addNotification
  );

  return (
    <div className="px-2 flex-grow flex justify-between items-center">
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
      <BarNotification />
    </div>
  );
}
