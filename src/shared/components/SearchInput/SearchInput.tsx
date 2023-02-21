import { IconButton, InputAdornment, TextField, TextFieldProps } from "@mui/material";
import React from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

export const SearchInput: React.FC<TextFieldProps> = (props) => {
  return (
    <TextField
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton>
              <SearchRoundedIcon />
            </IconButton>
          </InputAdornment>
        )
      }}
      {...props}
    />
  );
};
