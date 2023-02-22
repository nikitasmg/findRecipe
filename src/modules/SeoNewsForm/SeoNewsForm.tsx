import { FormControl, Input, InputLabel } from "@mui/material";
import React from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { Text } from "~/shared/components/Text";

type FormFields = {
  title?: string;
  description?: string;
};

type Props = {
  step: number;
  defaultValues?: FormFields;
  onUpdateForm?: (step: number, form: UseFormReturn<Record<string, unknown>, unknown>) => void;
};
export const SeoNewsForm: React.FC<Props> = ({ defaultValues }) => {
  const form = useForm<FormFields>({ defaultValues, mode: "all" });

  return (
    <form className='flex flex-col mt-2 gap-6'>
      <FormControl fullWidth className='!p-2'>
        <InputLabel htmlFor='title'>
          <Text>Heading</Text>
        </InputLabel>
        <Input id='title' {...form.register("title")} />
      </FormControl>
      <FormControl fullWidth className='!p-2'>
        <InputLabel htmlFor='description'>
          <Text>Description</Text>
        </InputLabel>
        <Input id='description' {...form.register("description")} />
      </FormControl>
    </form>
  );
};
