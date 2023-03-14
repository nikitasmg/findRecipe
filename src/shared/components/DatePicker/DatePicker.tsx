import { TextField } from "@mui/material";
import { DatePicker as MuiDatePicker, DatePickerProps } from "@mui/x-date-pickers";
import React from "react";

export const DatePicker: React.FC<Omit<DatePickerProps<unknown, unknown>, "renderInput">> = (
  props
) => {
  return (
    <MuiDatePicker {...props} renderInput={(props) => <TextField {...props} size='small' />} />
  );
};
