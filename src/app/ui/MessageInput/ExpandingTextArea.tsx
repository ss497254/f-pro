import React, { forwardRef } from "react";

export interface TextAreaProps extends React.ComponentPropsWithoutRef<"div"> {}

export const ExpandingTextArea = forwardRef<HTMLDivElement, TextAreaProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        contentEditable
        ref={ref}
        className={[
          "whitespace-pre-wrap text-sm resize-none min-h-[40px] before:text-color5 scroll-thin focus:empty:before:content-['Start_typing...'] empty:before:content-['Send_message'] max-h-[320px] bg-surface2 px-3 py-2 rounded overflow-auto w-full focus:outline-none",
        ].join(" ")}
        {...props}
      />
    );
  }
);

ExpandingTextArea.displayName = "TextArea";
