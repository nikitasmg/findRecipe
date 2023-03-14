import { Box } from "@mui/material";
import React from "react";
import { Control, UseFormGetValues } from "react-hook-form";
import { Document } from "~/generated/graphql";
import { ControlledDocumentsUpload } from "~/shared/components/ControlledDocumentsUpload";

export type DocumentsFormFields = {
  documents?: Document[];
  uploadDocuments?: (Document & { title?: string })[];
  deleteDocuments?: number[];
  updateDocuments?: Document[];
};

type Props = {
  setValue: (name: keyof DocumentsFormFields, value: Document[] | number[]) => void;
  getValues: UseFormGetValues<DocumentsFormFields>;
  control?: Control<DocumentsFormFields, unknown>;
};

export const DocumentsForm: React.FC<Props> = ({ setValue, control, getValues }) => {
  return (
    <Box className='flex flex-col gap-6 grow-[2] lg:w-[70%] order-last'>
      <ControlledDocumentsUpload setValue={setValue} control={control} getValues={getValues} />
    </Box>
  );
};
