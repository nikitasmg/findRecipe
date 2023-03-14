import { IconButton, InputAdornment, TextField, TextFieldProps } from "@mui/material";
import React from "react";
import LaunchIcon from "@mui/icons-material/Launch";
import { Link } from "react-router-dom";

export const LinkInput: React.FC<TextFieldProps> = (props) => {
  return (
    <TextField
      inputMode='url'
      size='small'
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <>
              {props.value && (
                <Link to={props.value} target='_blank'>
                  <IconButton>
                    <LaunchIcon />
                  </IconButton>
                </Link>
              )}
            </>
          </InputAdornment>
        )
      }}
      {...props}
    />
  );
};
