import React, { PropsWithChildren } from "react";
import { purple, green, grey } from "@mui/material/colors";
import { ThemeProvider, createTheme, StyledEngineProvider } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiTableHead: {
      defaultProps: {
        sx: {
          "& .MuiTableCell-head": {
            background: green["A700"]
          }
        }
      }
    },
    MuiTableBody: {
      defaultProps: {
        sx: {
          "& tr:nth-of-type(2n)": {
            background: grey[200]
          },
          "& .MuiTableRow-hover:hover": {
            background: "none"
          },
          "& .MuiTableRow-hover:nth-of-type(2n):hover": {
            background: grey[200]
          }
        }
      }
    }
  },
  palette: {
    primary: {
      main: green["A700"]
    },
    secondary: {
      main: purple[500]
    }
  }
});

export const CustomThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StyledEngineProvider>
  );
};
