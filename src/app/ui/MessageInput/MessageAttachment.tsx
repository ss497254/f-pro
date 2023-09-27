import { CloseIcon } from "app/icons";
import { clearLastScreenShot, getLastScreenShot } from "app/lib/screenshot";
import React, { useRef, useState } from "react";
import { Button, IconButton } from "../Buttons";
import { useConfigStore } from "app/stores/useConfigStore";

interface MessageAttachmentProps extends React.PropsWithChildren {}

export const MessageAttachment: React.FC<MessageAttachmentProps> = () => {
  const [attachmentOpen, setAttachmentOpen] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const imagePreviewEnabled = useConfigStore(
    (state) => state.imagePreviewEnabled
  );

  return (
    <div className="bg-surface3">
      {attachmentOpen &&
        (imagePreviewEnabled ? (
          <img
            key={clearLastScreenShot.toString()}
            src={getLastScreenShot()}
            ref={imageRef}
            className="border border-surface4 max-h-96 mx-auto"
          ></img>
        ) : (
          <div
            className="py-6 mb-1 text-center"
            style={{
              backgroundImage:
                "radial-gradient(var(--surface5) 1px, var(--surface3) 1px)",
              backgroundSize: "8px 8px",
            }}
          >
            Image
          </div>
        ))}
      <div className="py-1 px-2 flex justify-between items-center">
        <Button
          className="hover:!bg-surface1"
          onClick={() => setAttachmentOpen(!attachmentOpen)}
        >
          {attachmentOpen ? "Close attachment" : "View attachment"}
        </Button>
        <IconButton onClick={clearLastScreenShot}>
          <CloseIcon size={15} />
        </IconButton>
      </div>
    </div>
  );
};
