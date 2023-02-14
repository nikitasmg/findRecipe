import React, { PropsWithChildren } from "react";
import { purple, green } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: green[500]
    },
    secondary: {
      main: purple[500]
    }
  }
});

export const CustomThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
