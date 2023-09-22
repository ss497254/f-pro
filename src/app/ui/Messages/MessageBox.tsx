import { IMessage } from "src/types/IMessage";
import React from "react";

interface props extends IMessage {
  dir: "left" | "right";
}

const dirClassNames = {
  left: "mr-auto",
  right: "ml-auto",
};

export const MessageBox: React.FC<props> = ({
  content,
  dir,
  timestamp,
  username,
  delivering,
  image,
}) => {
  return (
    <div
      className={[
        "max-w-[80%] p-3 whitespace-pre-wrap bg-surface2 mx-3 my-1.5 relative rounded-md outline-none",
        dirClassNames[dir],
      ].join(" ")}
    >
      {image && (
        <div
          className="py-4 mb-1 text-center"
          style={{
            backgroundImage:
              "radial-gradient(var(--surface5) 1px, var(--surface3) 1px)",
            backgroundSize: "10px 10px",
          }}
        >
          Image
        </div>
      )}
      <p className="overflow-x-hidden text-sm hover:break-words text-ellipsis">
        {content}
      </p>
      <div className="mt-3 -mb-1 text-xs flex">
        <div className="flex-grow font-medium">
          {dir === "left" ? username : delivering ? "✔" : "✔✔"}
        </div>
        {new Date(timestamp).toLocaleString()}
      </div>
    </div>
  );
};
