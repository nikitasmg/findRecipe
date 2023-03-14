import { Box } from "@mui/material";
import { MuiFileInput } from "mui-file-input";
import { curry } from "rambda";
import React from "react";
import { Control, Controller, UseFormRegister } from "react-hook-form";
import { Text } from "~/shared/components/Text";

type FormFields = {
  "uploadDocuments.0"?: File | null;
  "uploadDocuments.1"?: File | null;
  "uploadDocuments.2"?: File | null;
  "uploadDocuments.3"?: File | null;
  "uploadDocuments.4"?: File | null;
};

type Props = {
  register: UseFormRegister<Partial<FormFields>>;
  setValue: (name: string, value: unknown) => void;
  control?: Control<FormFields, unknown>;
};
export const DocumentsForm: React.FC<Props> = ({ register, control, setValue }) => (
  <Box className='flex flex-col gap-6 items-start'>
    <Controller
      control={control}
      name='uploadDocuments.0'
      render={({ field }) => (
        <MuiFileInput
          label={<Text>Notice</Text>}
          hideSizeText
          {...field}
          {...register("uploadDocuments.0")}
          onChange={curry(setValue)("uploadDocuments.0")}
        />
      )}
    />

    <Controller
      control={control}
      name='uploadDocuments.1'
      render={({ field }) => (
        <MuiFileInput
          label={<Text>Tender documentation</Text>}
          hideSizeText
          {...field}
          {...register("uploadDocuments.1")}
          onChange={curry(setValue)("uploadDocuments.1")}
        />
      )}
    />

    <Controller
      control={control}
      name='uploadDocuments.2'
      render={({ field: { value } }) => (
        <MuiFileInput
          label={<Text>Envelope opening protocol</Text>}
          hideSizeText
          value={value}
          {...register("uploadDocuments.2")}
          onChange={curry(setValue)("uploadDocuments.2")}
        />
      )}
    />

    <Controller
      control={control}
      name='uploadDocuments.3'
      render={({ field: { value } }) => (
        <MuiFileInput
          label={<Text>Protocol for consideration and evaluation of applications</Text>}
          hideSizeText
          value={value}
          {...register("uploadDocuments.3")}
          onChange={curry(setValue)("uploadDocuments.3")}
        />
      )}
    />

    <Controller
      control={control}
      name='uploadDocuments.4'
      render={({ field: { value } }) => (
        <MuiFileInput
          label={<Text>Results</Text>}
          value={value}
          hideSizeText
          {...register("uploadDocuments.4")}
          onChange={curry(setValue)("uploadDocuments.4")}
        />
      )}
    />
  </Box>
);
