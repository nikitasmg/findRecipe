import { IconButton, InputAdornment, TextField, TextFieldProps } from "@mui/material";
import React, { forwardRef } from "react";
import LaunchIcon from "@mui/icons-material/Launch";

export const LinkInput = forwardRef<HTMLDivElement, TextFieldProps>(
  (props, ref): React.ReactElement => {
    const handleOpen = () => props.value && window.open(props.value as string, "_blank");

    return (
      <TextField
        ref={ref}
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
  }
);

LinkInput.displayName = "LinkInput";
