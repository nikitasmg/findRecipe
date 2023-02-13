import React, { PropsWithChildren } from "react";
import { CustomQueryClientProvider } from "./CustomQueryClientProvider";

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return <CustomQueryClientProvider>{children}</CustomQueryClientProvider>;
};
