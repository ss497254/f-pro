import React from "react";
import { Spinner } from "../Spinner";
import { ButtonTypes } from "./ButtonTypes";

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  disabled?: boolean;
  btn?: keyof typeof ButtonTypes;
  className?: string;
  size?: number;
}
export const IconButton: React.FC<IconButtonProps> = ({
  className,
  btn,
  children,
  loading,
  size = 30,
  ...prop
}) => {
  return (
    <button
      style={{ height: size, width: size }}
      className={[
        "flex justify-center items-center rounded-md",
        btn ? ButtonTypes[btn] : "bg-surface2 hover:bg-surface3",
        className,
      ].join(" ")}
      {...prop}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
};
