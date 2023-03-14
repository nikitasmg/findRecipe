import { IconButton, InputAdornment, TextField, TextFieldProps } from "@mui/material";
import React from "react";
import LaunchIcon from "@mui/icons-material/Launch";

export const LinkInput: React.FC<TextFieldProps> = (props) => {
  const handleOpen = () => props.value && window.open(props.value as string, "_blank");

  return (
    <TextField
      size='small'
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <>
              {props.value && (
                <IconButton onClick={handleOpen}>
                  <LaunchIcon />
                </IconButton>
              )}
            </>
          </InputAdornment>
        )
      }}
      {...props}
    />
  );
};
