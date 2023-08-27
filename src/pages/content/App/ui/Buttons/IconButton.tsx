import React from "react";
import { Spinner } from "../Spinner";
import { ButtonTypes } from "./ButtonTypes";

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  disabled?: boolean;
  btn?: keyof typeof ButtonTypes;
  iconSize?: number;
  icon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
  Icon?: React.ReactNode;
  loadingCentered?: boolean;
  size?: number;
}
export const IconButton: React.FC<IconButtonProps> = ({
  className,
  btn,
  children,
  loading,
  size = 40,
  ...prop
}) => {
  return (
    <button
      style={{ height: size, width: size }}
      className={[
        "c rounded-md",
        btn ? ButtonTypes[btn] : "bg-gray-200",
        className,
      ].join(" ")}
      {...prop}
    >
      {loading ? (
        <div className="absolute c bg-inherit">
          <Spinner />
        </div>
      ) : (
        children
      )}
    </button>
  );
};
