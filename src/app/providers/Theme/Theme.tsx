import React, { PropsWithChildren } from "react";
import { ThemeProvider, createTheme, StyledEngineProvider } from "@mui/material/styles";

const colors = {
  primary: "rgba(17, 135, 130, 0.85)",
  primaryActive: "#118782",
  secondary: "#08205C"
};

const tableTheme = {
  borderRadius: "8px",
  boxShadow: "0px 2px 7px rgba(116, 116, 116, 0.05)",
  border: "1px solid rgba(14, 129, 60, 0.15)",
  heightTableHead: "56px",
  heightTableRow: "153px"
};

const theme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {}
    },
    MuiTable: {
      styleOverrides: {
        root: {
          borderCollapse: "separate",
          borderSpacing: "0px 8px"
        }
      }
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          borderColor: colors.primary,
          boxShadow: tableTheme.boxShadow,
          borderRadius: tableTheme.borderRadius,
          position: "relative",
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          background: "none",
          border: tableTheme.border,
          borderLeft: "none",
          borderRight: "none",
        }
      },
      defaultProps: {
        sx: {
          "&:first-of-type": {
            borderRadius: `${tableTheme.borderRadius} 0px 0px ${tableTheme.borderRadius}`,
            borderLeft: tableTheme.border,
            position: "static"
          },
          "&:last-child": {
            borderRadius: `0px ${tableTheme.borderRadius} ${tableTheme.borderRadius} 0px`,
            borderRight: tableTheme.border,
          },
          "&:first-of-type:before": {
            content: "''",
            position: "absolute",
            height: "100%",
            top: 0,
            left: 0,
            borderRadius: tableTheme.borderRadius,
            width: "100%",
            display: "block",
            boxShadow: tableTheme.boxShadow,
            zIndex: -1,
          }
        }
      }
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          borderRadius: tableTheme.borderRadius,
          borderColor: colors.primary,
          height: tableTheme.heightTableHead
        }
      }
    },
    MuiTableBody: {
      styleOverrides:{
        root: {
          "& .MuiTableRow-root":{
            height: tableTheme.heightTableRow
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
    },
    MuiInputBase: {
      defaultProps: {
        size: "small"
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
