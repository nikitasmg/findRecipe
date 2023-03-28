import React, { PropsWithChildren } from "react";
import { grey } from "@mui/material/colors";
import { ThemeProvider, createTheme, StyledEngineProvider } from "@mui/material/styles";

const colors = {
  primary: "rgba(17, 135, 130, 0.85)",
  primaryActive: "#118782",
  secondary: "#08205C"
};

const theme = createTheme({
  components: {
    MuiTableHead: {
      defaultProps: {
        sx: {
          "& .MuiTableCell-head": {
            background: grey[200]
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
    MuiInput: {
      defaultProps: {
        size: "small"
      }
    },
    MuiTextField: {
      defaultProps: {
        InputProps: {
          size: "small"
        },
        InputLabelProps: {
          shrink: true
        }
      }
    },
    MuiSelect: {
      defaultProps: {
        size: "small"
      }
    },
    MuiMenu: {
      defaultProps: {
        style: {
          height: "300px"
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
