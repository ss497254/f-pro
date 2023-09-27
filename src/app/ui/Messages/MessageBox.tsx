import { IMessage } from "src/types/IMessage";
import React from "react";
import useLongPress from "app/hooks/useLongPress";
import { IconButton } from "../Buttons";
import { EditIcon } from "app/icons";
import { ImagePreview } from "../ImagePreview";

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
  const { longpress, handlers } = useLongPress();

  return (
    <div
      className={[
        "max-w-[80%] p-3 whitespace-pre-wrap mx-3 my-1.5 relative rounded-md outline-none",
        longpress ? "bg-surface3" : "bg-surface2",
        dirClassNames[dir],
      ].join(" ")}
      {...handlers}
    >
      {longpress && (
        <div
          className={[
            "absolute bottom-1",
            dir === "right" ? "-left-8" : "-right-8",
          ].join(" ")}
        >
          <IconButton>
            <EditIcon />
          </IconButton>
        </div>
      )}
      {image && <ImagePreview src={image} />}
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
