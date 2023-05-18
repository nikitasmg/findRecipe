import { TextField } from "@mui/material";
import { DatePicker as MuiDatePicker, DatePickerProps } from "@mui/x-date-pickers";
import React from "react";
import { Dayjs } from "dayjs";
import { CalendarIcon } from "~shared/components/Icons";

export const DatePicker: React.FC<
  Omit<DatePickerProps<Date | string | undefined | null, Dayjs>, "renderInput">
  > = (props) => {
  return (
    <MuiDatePicker
      {...props}
      renderInput={(props) => <TextField {...props} />}
      components={{ OpenPickerIcon: CalendarIcon }}
      OpenPickerButtonProps={{ sx: { marginRight: "-6px" } }}
    />
  );
};
