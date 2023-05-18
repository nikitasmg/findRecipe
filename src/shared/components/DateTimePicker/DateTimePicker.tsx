import { TextField } from "@mui/material";
import { DateTimePicker as MuiDateTimePicker, DateTimePickerProps } from "@mui/x-date-pickers";
import React from "react";
import { Dayjs } from "dayjs";
import { CalendarIcon } from "~shared/components/Icons";

export const DateTimePicker: React.FC<
  Omit<DateTimePickerProps<string | undefined | null, Dayjs>, "renderInput">
> = (props) => {
  return (
    <MuiDateTimePicker
      {...props}
      renderInput={(props) => <TextField {...props} />}
      components={{
        OpenPickerIcon: CalendarIcon
      }}
      OpenPickerButtonProps={{ sx: { marginRight: "-6px" } }}
    />
  );
};
