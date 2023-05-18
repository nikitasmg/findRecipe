import React, { PropsWithChildren } from "react";
import { ThemeProvider, createTheme, StyledEngineProvider } from "@mui/material/styles";
import { DropdownIcon } from "~/shared/components/Icons";

export const colors = {
  primary: "#118782",
  primary5: "rgba(17,135,130,0.05)",
  primary10: "rgba(17,135,130,0.1)",
  primary30: "rgba(17,135,130,0.3)",
  primaryDark: "#0d6965",
  primaryLight: "#E5EBE7",
  secondary: "#08205C",
  mainBg: "#ffffff",
  secondaryBg: "#F8FAFC",
  mainError: "#D23C3C",
  mainText: "#1C1C1C",
  secondaryText: "#828282",
  blue: "#2F80ED"
};

const tableTheme = {
  borderRadius: "8px",
  boxShadow: "0px 2px 7px rgba(116, 116, 116, 0.05)",
  border: "1px solid rgba(14, 129, 60, 0.15)",
  heightTableHead: "56px",
  heightTableRow: "153px",
  paddingHeadCell: "8px 16px 8px 0",
  paddingCell: "16px 16px 16px 12px",
  paddingFirstCell: "8px 16px 8px 24px",
  fontSizeCell: "14px"
};

const buttonStyle = {
  height: 48,
  minWidth: 140,
  padding: "12px 24px",
  borderRadius: 8,
  boxShadow: "none",
  "& .MuiTypography-root": {
    fontWeight: 500,
    fontSize: 14,
    lineHeight: "17px"
  }
};

const theme = createTheme({
  typography: {
    fontFamily: "Inter, sans-serif"
  },
  components: {
    MuiPaper: {
      styleOverrides: {}
    },
    MuiTable: {
      styleOverrides: {
        root: {
          borderCollapse: "separate",
          borderSpacing: "0px 8px",
          backgroundColor: colors.secondaryBg
        }
      }
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          backgroundColor: colors.mainBg,
          borderRadius: tableTheme.borderRadius,
          position: "relative"
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          background: "none",
          border: "none",
          fontSize: tableTheme.fontSizeCell,
          padding: tableTheme.paddingCell,
          "&:first-of-type": {
            padding: tableTheme.paddingFirstCell
          }
        },
        head: {
          padding: tableTheme.paddingHeadCell,
          "&:first-of-type": {
            padding: tableTheme.paddingFirstCell
          }
        }
      },
      defaultProps: {
        sx: {
          "&:first-of-type": {
            borderRadius: `${tableTheme.borderRadius} 0px 0px ${tableTheme.borderRadius}`,
            position: "static"
          },
          "&:last-child": {
            borderRadius: `0px ${tableTheme.borderRadius} ${tableTheme.borderRadius} 0px`
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
            zIndex: -1
          }
        }
      }
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          borderRadius: tableTheme.borderRadius,
          height: tableTheme.heightTableHead
        }
      }
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          "& .MuiTableRow-root": {
            height: tableTheme.heightTableRow
          }
        }
      }
    },

    MuiCheckbox: {
      styleOverrides: {
        root: {
          padding: 0
        }
      }
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          padding: "0 16px 0 8px",
          marginLeft: 6,
          transform: "translate(10px, -14px) scale(1)",
          backgroundColor: colors.mainBg,
          p: {
            fontWeight: 500,
            fontSize: 14,
            lineHeight: "24px",
            color: colors.mainText
          }
        }
      },
      defaultProps: {
        shrink: true
      }
    },

    MuiInputBase: {
      styleOverrides: {
        root: {
          height: 52,
          padding: "16px 16px 16px 24px",
          border: "none",
          fieldset: {
            borderWidth: "1px !important",
            borderColor: colors.primaryLight,
            borderRadius: 8,
            padding: "0 24px 0 16px"
          },
          "&:hover, &:focus": {
            fieldset: {
              border: `1px solid ${colors.primary} !important`
            }
          },
          "&.Mui-error": {
            "&:hover, &:focus": {
              fieldset: {
                border: `1px solid ${colors.mainError} !important`
              }
            }
          }
        },
        input: {
          height: 52,
          padding: "0 !important"
        },
        multiline: {
          minHeight: 52,
          height: "auto",
          padding: "0 !important"
        },
        inputMultiline: {
          minHeight: "52px !important",
          height: "auto !important",
          padding: "16px 24px !important"
        }
      }
    },

    MuiAutocomplete: {
      styleOverrides: {
        inputRoot: {
          padding: "0 60px 0 24px !important"
        },
        popupIndicator: {
          marginRight: 4
        }
      },
      defaultProps: {
        popupIcon: <DropdownIcon />
      }
    },

    MuiTextField: {
      defaultProps: {
        InputLabelProps: {
          shrink: true
        }
      }
    },

    MuiSelect: {
      styleOverrides: {
        icon: {
          position: "static"
        }
      },
      defaultProps: {
        IconComponent: DropdownIcon
      }
    },

    MuiSwitch: {
      styleOverrides: {
        track: {
          ".Mui-checked.Mui-checked + &": {
            opacity: 0.3
          }
        },
        thumb: {
          boxShadow: "0px 2px 4px rgba(83, 83, 83, 0.2)"
        }
      }
    },

    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          "&[type='submit'], &[type='button']": {
            backgroundColor: colors.primary,
            "&:hover": {
              backgroundColor: colors.primaryDark
            },
            "&:disabled": {
              backgroundColor: colors.secondaryText,
              color: "white"
            }
          }
        },
        outlined: buttonStyle,
        contained: buttonStyle
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
    },
    error: {
      main: colors.mainError
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
