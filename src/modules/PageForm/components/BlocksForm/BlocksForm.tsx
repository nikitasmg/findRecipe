import { Box } from "@mui/material";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Languages } from "~/shared/types/Languages";

type Params = Record<string, unknown>;

type FormProps<T extends Params = Params> = {
  lang: Languages;
  form: UseFormReturn<T>;
};

type Props<T extends Params = Params> = FormProps<T> & {
  render: (form: UseFormReturn<T>, lang: Languages) => JSX.Element;
};

export const BlocksForm: React.FC<Props> = ({ render, ...props }) => {
  return (
    <Box className='flex flex-col gap-6 w-full lg:w-[70%]'>{render(props.form, props.lang)}</Box>
  );
};
