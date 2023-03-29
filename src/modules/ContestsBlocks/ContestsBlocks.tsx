import { Box } from "@mui/material";
import React from "react";
import { Control } from "react-hook-form";
import { EmailField } from "./components/EmailField";

type ParamsFormFields = {
  "params.email"?: string;
};

type Props = {
  setValue?: (name: keyof ParamsFormFields, value: string | number) => void;
  control?: Control<ParamsFormFields, unknown>;
};

export const ContestsBlocks: React.FC<Props> = ({ setValue, control }) => {
  return (
    <Box>
      <EmailField setValue={setValue} control={control} />
    </Box>
  );
};
