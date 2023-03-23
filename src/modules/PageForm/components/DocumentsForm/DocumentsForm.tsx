import { Box } from "@mui/material";
import React from "react";
import { Control, Controller } from "react-hook-form";
import { Document } from "~/generated/graphql";
import { DocumentsUpload } from "~/shared/components/DocumentsUpload";

type FormFields = {
  documents?: Document[];
};

type Props = {
  setValue: (name: string, value: unknown) => void;
  control?: Control<FormFields, unknown>;
};

export const DocumentsForm: React.FC<Props> = ({ setValue, control }) => {
  return (
    <Box className='flex flex-col gap-6 w-full lg:w-[70%]'>
      <Controller
        control={control}
        name='documents'
        render={({ field: { value } }) => (
          <DocumentsUpload
            value={value?.map((document) => ({
              title: document.user_name ?? "",
              url: document.user_name ?? ""
            }))}
            onChange={(documents) => {
              setValue("uploadDocuments", documents);
            }}
          />
        )}
      />
    </Box>
  );
};
