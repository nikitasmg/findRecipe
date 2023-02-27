import { Box, FormControl, Input, InputLabel } from "@mui/material";
import { prop } from "rambda";
import React, { useEffect } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { ContentEditor } from "~shared/components/ContentEditor";
import { HelperText } from "~/shared/components/HelperText";
import { ImageInput } from "~/shared/components/ImageInput";
import { Text } from "~/shared/components/Text";

type FormFields = {
  name?: string;
  description?: string;
  content?: string;
  image?: string;
};

type Props = {
  step: number;
  defaultValues?: FormFields;
  onUpdateForm?: (step: number, form: UseFormReturn<Record<string, unknown>, unknown>) => void;
};

export const GeneralNewsForm: React.FC<Props> = ({ defaultValues, step, onUpdateForm }) => {
  const form = useForm<FormFields>({ defaultValues, mode: "all" });

  const {
    formState: { errors }
  } = form;

  const getError = (field: keyof FormFields) => prop("message", errors[field]);

  useEffect(() => {
    onUpdateForm?.(step, form as unknown as UseFormReturn<Record<string, unknown>, unknown>);
  }, [form, onUpdateForm, step]);

  return (
    <form className='flex flex-col lg:flex-row gap-6'>
      <Box className='grow-[2] lg:w-[70%] order-last mt-2'>
        <FormControl fullWidth className='!p-2'>
          <InputLabel error={!!getError("name")} htmlFor='name'>
            <Text>Title</Text>
          </InputLabel>
          <Input
            id='name'
            error={!!getError("name")}
            {...form.register("name", { required: "This is required" })}
          />

          <HelperText id='name' error={getError("name")} />
        </FormControl>

        <FormControl fullWidth className='!p-2 !mt-4'>
          <InputLabel error={!!getError("description")} htmlFor='description'>
            <Text>Description</Text>
          </InputLabel>
          <Input id='description' {...form.register("description")} />
        </FormControl>

        <FormControl fullWidth className='!p-2 !mt-4'>
          <ContentEditor id='content' value='' {...form.register("content")} />
        </FormControl>
      </Box>

      <Box className='grow-[1] flex justify-center lg:w-[30%] order-first lg:order-last'>
        <ImageInput id='general' {...form.register("image")} />
      </Box>
    </form>
  );
};
