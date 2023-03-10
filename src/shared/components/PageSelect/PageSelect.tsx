import { Autocomplete, TextField } from "@mui/material";
import React from "react";
import { Text } from "../Text";

type Props = {
  label: string;
  pages: { label: string; value: string }[];
};

export const PageSelect: React.FC<Props> = ({ pages, label }) => {
  return (
    <Autocomplete
      disablePortal
      options={pages}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label={<Text>{label}</Text>} />}
    />
  );
};
