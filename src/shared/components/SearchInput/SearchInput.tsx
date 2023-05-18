import { IconButton, InputAdornment, TextField, TextFieldProps } from "@mui/material";
import React, { useCallback } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { SearchIcon } from "~shared/components/Icons";

export const SearchInput: React.FC<
  TextFieldProps & {
    handleClose: () => void;
    opened?: boolean;
    searchOnly?: boolean;
    handleReset?: () => void;
  }
> = ({ handleClose, opened, searchOnly, handleReset, ...props }) => {
  const handleCloseIcon = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      handleClose();
      searchOnly && handleReset?.();
    },
    [handleClose, handleReset, searchOnly]
  );

  return (
    <TextField
      fullWidth={opened || searchOnly}
      InputProps={{
        autoComplete: "off",
        startAdornment: (
          <InputAdornment position='start' style={{ width: 30 }}>
            {opened ? (
              <IconButton onClick={handleCloseIcon}>
                <CloseIcon />
              </IconButton>
            ) : (
              <IconButton>
                <SearchIcon />
              </IconButton>
            )}
          </InputAdornment>
        ),
        className: "px-1 h-[46px] z-50",
        sx: {
          "&:hover fieldset, &:focus fieldset": { border: "none !important" },
          fieldset: { border: "none !important" }
        }
      }}
      sx={{
        "& .MuiInputBase-input": {
          overflow: "hidden",
          textOverflow: "ellipsis"
        }
      }}
      inputProps={{
        style: { height: 48, width: opened || searchOnly ? "100%" : 120 }
      }}
      {...props}
    />
  );
};
