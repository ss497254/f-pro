import { BlockButton } from "@app/ui/Buttons";
import React, { useState } from "react";
import { useConfigStore } from "../stores/useConfigStore";
import { useNotificationStore } from "../stores/useNotificationsStore";

interface LoginBarProps extends React.PropsWithChildren {}

export const LoginBar: React.FC<LoginBarProps> = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { update } = useConfigStore();
  const { addNotification } = useNotificationStore();

  return (
    <form
      className="flex space-x-3"
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(false);

        const form = e.currentTarget;
        const { value: u } = form.elements.namedItem("u") as HTMLInputElement;
        const { value: p } = form.elements.namedItem("p") as HTMLInputElement;

        try {
          const res = await chrome.runtime.sendMessage({ type: "login", u, p });

          if (res?.user) update("user", res.user);
          else throw new Error(res?.message || "Login error");
        } catch (e) {
          addNotification({ content: JSON.stringify(e), type: "error" });
          setError(true);
        } finally {
          setLoading(false);
        }
      }}
    >
      <input
        required
        className="px-2 h-6 bg-zinc-900 outline-none"
        name="u"
        placeholder="u"
      />
      <input
        required
        className="px-2 h-6 bg-zinc-900 outline-none"
        name="p"
        placeholder="p"
      />
      <BlockButton
        loading={loading}
        className={[error ? "!text-red-700" : "", "w-14 h-6"].join(" ")}
      >
        Dick
      </BlockButton>
    </form>
  );
};
