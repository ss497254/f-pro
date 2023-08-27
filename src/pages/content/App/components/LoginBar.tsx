import React from "react";
import { useLoginStore } from "../../stores/useLoginStore";
import { Button } from "../ui/Buttons";

interface LoginBarProps extends React.PropsWithChildren {}

export const LoginBar: React.FC<LoginBarProps> = () => {
  const { toggleLoggedIn } = useLoginStore();
  return (
    <form
      className="flex space-x-3"
      onSubmit={(e) => {
        toggleLoggedIn();
      }}
    >
      <input className="px-2" placeholder="u" />
      <input className="px-2" placeholder="p" />
      <Button btn="outline">Ding</Button>
    </form>
  );
};
