import { IMessage } from "@app/types/IMessage";
import React from "react";

interface props extends IMessage {
  dir: "left" | "right";
}

const dirClassNames = {
  left: "mr-auto bg-surface2",
  right: "ml-auto bg-indigo-900",
};

export const MessageBox: React.FC<props> = ({ content, dir, timestamp }) => {
  // console.count(content.substring(0, 10));

  return (
    <div
      className={[
        "max-w-[80%] p-3 whitespace-pre-wrap mx-3 my-1.5 relative rounded-md outline-none",
        dirClassNames[dir],
      ].join(" ")}
    >
      <p className="overflow-x-hidden text-sm hover:break-words text-ellipsis">
        {content}
      </p>
      <div className="mt-2 -mb-2 -mr-1 text-xs text-right">
        {new Date(timestamp).toTimeString().substring(0, 5)}
      </div>
    </div>
  );
};