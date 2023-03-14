import { IconButton, InputAdornment, TextField, TextFieldProps } from "@mui/material";
import React from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CloseIcon from "@mui/icons-material/Close";

export const SearchInput: React.FC<TextFieldProps & { handleReset: () => void }> = (props) => {
  return (
    <TextField
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton>
              {props.value ? <CloseIcon onClick={props.handleReset} /> : <SearchRoundedIcon />}
            </IconButton>
          </InputAdornment>
        )
      }}
      {...props}
    />
  );
};
