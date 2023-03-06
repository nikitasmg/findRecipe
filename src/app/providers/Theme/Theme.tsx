import React, { PropsWithChildren } from "react";
import { grey } from "@mui/material/colors";
import { ThemeProvider, createTheme, StyledEngineProvider } from "@mui/material/styles";

const colors = { primary: "#22c55e", primaryActive: "#15803d", secondary: "#9c27b0" };

const theme = createTheme({
  components: {
    MuiTableHead: {
      defaultProps: {
        sx: {
          "& .MuiTableCell-head": {
            background: colors.primary
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
    },
    MuiInputLabel: {
      defaultProps: {
        shrink: true
      }
    },
    MuiTextField: {
      defaultProps: {
        InputLabelProps: {
          shrink: true
        }
      }
    }
  },
  palette: {
    primary: {
      main: colors.primary
    },
    secondary: {
      main: colors.secondary
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
