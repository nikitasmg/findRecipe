import React, { PropsWithChildren } from "react";
import { CustomQueryClientProvider } from "./CustomQueryClientProvider";
import { CustomThemeProvider } from "./Theme";
import "./Translation";

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <CustomThemeProvider>
      <CustomQueryClientProvider>{children}</CustomQueryClientProvider>
    </CustomThemeProvider>
  );
};
