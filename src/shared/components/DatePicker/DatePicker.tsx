import { TextField } from "@mui/material";
import { DatePicker as MuiDatePicker, DatePickerProps } from "@mui/x-date-pickers";
import React from "react";
import { Dayjs } from "dayjs";

export const DatePicker: React.FC<
  Omit<DatePickerProps<string | undefined | null, Dayjs>, "renderInput">
> = (props) => {
  return (
    <MuiDatePicker {...props} renderInput={(props) => <TextField {...props} size='small' />} />
  );
};
