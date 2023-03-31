import { TextField } from "@mui/material";
import { curry } from "rambda";
import React from "react";
import { Control, Controller } from "react-hook-form";
import { Text } from "~/shared/components/Text";
import { getEventValueHandler } from "~/shared/lib/events";

type Props = {
  setValue?: (name: "params.email", value: string) => void;
  control?: Control<{ "params.email"?: string }, unknown>;
};

export const EmailField: React.FC<Props> = ({ setValue, control }) => {
  if (!setValue) {
    return null;
  }

  return (
    <Controller
      control={control}
      name='params.email'
      render={({ field: { value } }) => (
        <TextField
          fullWidth
          label={<Text>Contact for communication</Text>}
          value={value}
          onChange={getEventValueHandler(curry(setValue)("params.email"))}
        />
      )}
    />
  );
};
