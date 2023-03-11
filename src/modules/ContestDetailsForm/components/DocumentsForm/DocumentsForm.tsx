import { Box } from "@mui/material";
import { MuiFileInput } from "mui-file-input";
import { curry } from "rambda";
import React from "react";
import { Control, Controller, UseFormRegister } from "react-hook-form";
import { Text } from "~/shared/components/Text";

type FormFields = {
  "uploadDocuments.notice"?: File | null;
  "uploadDocuments.tender_documentation"?: File | null;
  "uploadDocuments.open_protocol"?: File | null;
  "uploadDocuments.application_protocol"?: File | null;
  "uploadDocuments.results"?: File | null;
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
      name='uploadDocuments.notice'
      render={({ field: { value } }) => (
        <MuiFileInput
          label={<Text>Notice</Text>}
          value={value}
          {...register("uploadDocuments.notice")}
          onChange={curry(setValue)("uploadDocuments.notice")}
        />
      )}
    />

    <Controller
      control={control}
      name='uploadDocuments.tender_documentation'
      render={({ field: { value } }) => (
        <MuiFileInput
          label={<Text>Tender documentation</Text>}
          value={value}
          {...register("uploadDocuments.tender_documentation")}
          onChange={curry(setValue)("uploadDocuments.tender_documentation")}
        />
      )}
    />

    <Controller
      control={control}
      name='uploadDocuments.open_protocol'
      render={({ field: { value } }) => (
        <MuiFileInput
          label={<Text>Envelope opening protocol</Text>}
          value={value}
          {...register("uploadDocuments.open_protocol")}
          onChange={curry(setValue)("uploadDocuments.open_protocol")}
        />
      )}
    />

    <Controller
      control={control}
      name='uploadDocuments.application_protocol'
      render={({ field: { value } }) => (
        <MuiFileInput
          label={<Text>Protocol for consideration and evaluation of applications</Text>}
          value={value}
          {...register("uploadDocuments.application_protocol")}
          onChange={curry(setValue)("uploadDocuments.application_protocol")}
        />
      )}
    />

    <Controller
      control={control}
      name='uploadDocuments.results'
      render={({ field: { value } }) => (
        <MuiFileInput
          label={<Text>Results</Text>}
          value={value}
          {...register("uploadDocuments.results")}
          onChange={curry(setValue)("uploadDocuments.results")}
        />
      )}
    />
  </Box>
);
