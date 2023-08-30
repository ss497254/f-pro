import { useLoginStore } from "@app/stores/useLoginStore";
import { BlockButton } from "@app/ui/Buttons";
import React from "react";

interface LoginBarProps extends React.PropsWithChildren {}

export const LoginBar: React.FC<LoginBarProps> = () => {
  const { toggleLoggedIn } = useLoginStore();
  return (
    <form
      className="flex space-x-3"
      onSubmit={async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const { value: u } = form.elements.namedItem("u") as HTMLInputElement;
        const { value: p } = form.elements.namedItem("p") as HTMLInputElement;

        toggleLoggedIn();
      }}
    >
      <input
        className="px-2 h-6 bg-zinc-900 outline-none"
        name="u"
        placeholder="u"
      />
      <input
        className="px-2 h-6 bg-zinc-900 outline-none"
        name="p"
        placeholder="p"
      />
      <BlockButton>Ding</BlockButton>
    </form>
  );
};
