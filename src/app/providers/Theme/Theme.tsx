import React, { PropsWithChildren } from "react";
import { purple, green, grey } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiTableHead: {
      defaultProps: {
        className: "bg-green-500"
      }
    },
    MuiTableBody: {
      defaultProps: {
        sx: {
          "& tr:nth-child(2n)": {
            background: grey[200]
          },
          "& .MuiTableRow-hover:hover": {
            background: "none"
          },
          "& .MuiTableRow-hover:nth-child(2n):hover": {
            background: grey[200]
          }
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          background: "transparent"
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
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
