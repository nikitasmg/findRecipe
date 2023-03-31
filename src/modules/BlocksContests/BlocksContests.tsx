import { Box } from "@mui/material";
import React from "react";
import { Control } from "react-hook-form";
import { Languages } from "~/shared/types/Languages";
import { EmailField, ParamsFormFields } from "./components/EmailField";

type Props = {
  lang: Languages;
  setValue?: (name: keyof ParamsFormFields, value: string | number) => void;
  control?: Control<ParamsFormFields, unknown>;
};

export const BlocksContests: React.FC<Props> = ({ setValue, control, lang }) => {
  return (
    <Box>
      <EmailField setValue={setValue} control={control} lang={lang} />
    </Box>
  );
};
