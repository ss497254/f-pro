import { useState } from "react";

export const useForceRender = () => {
  const [value, setValue] = useState(1);

  return () => setValue(value * -1);
};
