import { useNotificationStore } from "app/stores/useNotificationsStore";
import { BlockButton } from "app/ui/Buttons";
import { handleLogin } from "app/lib/auth";
import React, { useState } from "react";

interface LoginBarProps extends React.PropsWithChildren {}

export const LoginBar: React.FC<LoginBarProps> = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { addNotification } = useNotificationStore();

  return (
    <form
      className="flex space-x-3 my-0"
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(false);

        const form = e.currentTarget;
        const { value: u } = form.elements.namedItem("u") as HTMLInputElement;
        const { value: p } = form.elements.namedItem("p") as HTMLInputElement;

        try {
          await handleLogin({ u, p });
        } catch (e: any) {
          addNotification({
            content: e.message,
            type: "error",
          });
          setError(true);
        } finally {
          setLoading(false);
        }
      }}
    >
      <input
        required
        autoComplete="off"
        className="px-2 h-6 bg-surface2 outline-none"
        name="u"
        placeholder="u"
      />
      <input
        required
        autoComplete="off"
        className="px-2 h-6 bg-surface2 outline-none"
        name="p"
        placeholder="p"
      />
      <BlockButton
        loading={loading}
        className={[error ? "!text-red-700" : "", "w-16 h-6"].join(" ")}
      >
        knock
      </BlockButton>
    </form>
  );
};
