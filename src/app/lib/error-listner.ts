import { useNotificationStore } from "app/stores/useNotificationsStore";
import { stopEventPropagation } from "./stop-event-propagation";

export const ErrorListner = (e: ErrorEvent | PromiseRejectionEvent) => {
  e.preventDefault();
  stopEventPropagation(e);

  try {
    if (e instanceof ErrorEvent)
      useNotificationStore.getState().addNotification({
        type: "error",
        content: e.message,
        extra: {
          lineno: e.lineno,
          stack: e.error?.stack,
        },
      });
    else
      useNotificationStore.getState().addNotification({
        type: "error",
        content: e.reason + "",
      });
  } catch {}
};
