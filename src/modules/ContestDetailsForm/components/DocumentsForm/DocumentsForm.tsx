import { Box } from "@mui/material";
import { MuiFileInput } from "mui-file-input";
import React from "react";
import { Control, Controller, UseFormGetValues, UseFormRegister } from "react-hook-form";
import { Document } from "~/generated/graphql";
import { Text } from "~/shared/components/Text";

export type DocumentFormFields = {
  documents?: (Document | null)[];
  uploadDocuments?: (File | null)[];
  localDocuments?: (File | null)[];
  deleteDocuments?: (string | number)[];
};

type Props = {
  register: UseFormRegister<Partial<DocumentFormFields>>;
  setValue: (
    name:
      | `documents.${number}`
      | `localDocuments.${number}`
      | "deleteDocuments"
      | `uploadDocuments.${number}`,
    value?: File | null | (string | number)[]
  ) => void;
  getValues: UseFormGetValues<DocumentFormFields>;
  control?: Control<DocumentFormFields, unknown>;
};

export const DocumentsForm: React.FC<Props> = ({ register, control, setValue, getValues }) => {
  const getDocumentChangeHandler = (index: number) => (value: File | null) => {
    const initial = getValues(`documents.${index - 1}`);

    setValue(`localDocuments.${index}`, value);

    if (initial) {
      setValue("deleteDocuments", (getValues("deleteDocuments") ?? []).concat(initial?.id));
    }

    if (!value) {
      return;
    }

    setValue(`uploadDocuments.${index}`, value);
  };

  return (
    <Box className='flex flex-col gap-6 items-start'>
      <Controller
        control={control}
        name='localDocuments.1'
        render={({ field }) => (
          <MuiFileInput
            label={<Text>Notice</Text>}
            hideSizeText
            {...field}
            {...register("localDocuments.1")}
            onChange={getDocumentChangeHandler(1)}
          />
        )}
      />

      <Controller
        control={control}
        name='localDocuments.2'
        render={({ field }) => (
          <MuiFileInput
            label={<Text>Tender documentation</Text>}
            hideSizeText
            {...field}
            {...register("localDocuments.2")}
            onChange={getDocumentChangeHandler(2)}
          />
        )}
      />

      <Controller
        control={control}
        name='localDocuments.3'
        render={({ field: { value } }) => (
          <MuiFileInput
            label={<Text>Envelope opening protocol</Text>}
            hideSizeText
            value={value}
            {...register("localDocuments.3")}
            onChange={getDocumentChangeHandler(3)}
          />
        )}
      />

      <Controller
        control={control}
        name='localDocuments.4'
        render={({ field: { value } }) => (
          <MuiFileInput
            label={<Text>Protocol for consideration and evaluation of applications</Text>}
            hideSizeText
            value={value}
            {...register("localDocuments.4")}
            onChange={getDocumentChangeHandler(4)}
          />
        )}
      />

      <Controller
        control={control}
        name='localDocuments.5'
        render={({ field: { value } }) => (
          <MuiFileInput
            label={<Text>Results</Text>}
            value={value}
            hideSizeText
            {...register("localDocuments.5")}
            onChange={getDocumentChangeHandler(5)}
          />
        )}
      />
    </Box>
  );
};
