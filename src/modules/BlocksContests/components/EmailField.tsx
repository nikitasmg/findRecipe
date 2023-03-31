import { TextField } from "@mui/material";
import { curry } from "rambda";
import React, { Fragment } from "react";
import { Control, Controller } from "react-hook-form";
import { EnLabelWrapper } from "~/shared/components/EnLabelWrapper";
import { Text } from "~/shared/components/Text";
import { getEventValueHandler } from "~/shared/lib/events";
import { Languages } from "~/shared/types/Languages";

export type ParamsFormFields = {
  "params.email"?: string;
  "params.email_en"?: string;
};

type Props = {
  lang: Languages;
  setValue?: (name: keyof ParamsFormFields, value: string) => void;
  control?: Control<ParamsFormFields, unknown>;
};

export const EmailField: React.FC<Props> = ({ setValue, control, lang }) => {
  if (!setValue) {
    return null;
  }

  const isRusLang = lang === "ru";

  const name = isRusLang ? "params.email" : "params.email_en";

  const LabelWrapper = isRusLang ? Fragment : EnLabelWrapper;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value } }) => (
        <TextField
          fullWidth
          label={
            <LabelWrapper>
              <Text>Contact for communication</Text>
            </LabelWrapper>
          }
          value={value}
          onChange={getEventValueHandler(curry(setValue)(name))}
        />
      )}
    />
  );
};
