import { Spinner } from "../Spinner";
import { ButtonProps } from "./Button";

export const BlockButton = ({
  loading,
  disabled,
  iconSize,
  children,
  className,
  ...props
}: ButtonProps) => {
  const classes = [
    "relative flex items-center outline-none focus:border focus:border-zinc-800 px-3 justify-center bg-black hover:bg-zinc-900 text-white",
  ];

  if (className) {
    classes.push(className);
  }

  if (disabled) {
    classes.push("cursor-not-allowed");
  }

  return (
    <button
      disabled={disabled || loading}
      className={classes.join(" ")}
      {...props}
    >
      {loading && (
        <div className="absolute inset-0 bg-inherit flex items-center justify-center">
          <Spinner size={iconSize} />
        </div>
      )}
      {children}
    </button>
  );
};
