import { Box } from "@mui/material";
import React from "react";
import { Control, UseFormGetValues } from "react-hook-form";

type Params = Record<string, unknown>;

type FormFields<T = Params> = {
  params?: T;
};

type FormProps<T = Params> = {
  setValue: (name: string, value: unknown) => void;
  getValues: UseFormGetValues<Params>;
  control?: Control<FormFields<T>, unknown>;
};

type Props<T = Params> = FormProps<T> & {
  render: (form: FormProps<T>) => JSX.Element;
};

export const BlocksForm: React.FC<Props> = ({ render, ...props }) => {
  return <Box className='flex flex-col gap-6 w-full lg:w-[70%]'>{render(props)}</Box>;
};
