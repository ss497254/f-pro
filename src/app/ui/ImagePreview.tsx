import { useConfigStore } from "app/stores/useConfigStore";
import React from "react";

interface ImagePreviewProps extends React.PropsWithChildren {
  src: string;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ src }) => {
  const imagePreviewEnabled = useConfigStore(
    (state) => state.imagePreviewEnabled
  );

  if (!imagePreviewEnabled)
    return (
      <div
        className="py-4 mb-1 text-center"
        style={{
          backgroundImage:
            "radial-gradient(var(--surface5) 1px, var(--surface3) 1px)",
          backgroundSize: "8px 8px",
        }}
      >
        Image
      </div>
    );

  return <img src={src} />;
};
