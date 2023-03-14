import { Box } from "@mui/material";
import React from "react";
import { Control, Controller, UseFormGetValues } from "react-hook-form";
import { Document } from "~/generated/graphql";
import { DocumentsUpload } from "~/shared/components/DocumentsUpload";

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
      <Controller
        control={control}
        name='documents'
        render={({ field: { value } }) => (
          <DocumentsUpload
            value={value?.map((document: Document & { title?: string }) => ({
              id: document.id,
              title: document.user_name ?? (document.title || ""),
              url: document.url ?? ""
            }))}
            onChange={(documents) => {
              const currentCount = value?.length ?? 0;
              const newCount = documents?.length ?? 0;
              setValue("documents", documents as Document[]);

              if (currentCount < newCount && documents.at(-1)) {
                const current = getValues("uploadDocuments");

                setValue("uploadDocuments", (current ?? []).concat(documents.at(-1) as Document));
              }
            }}
            onDelete={(document) => {
              const current = getValues("deleteDocuments");
              setValue("deleteDocuments", (current ?? []).concat(document));
            }}
            onUpdate={(document) => {
              const current = getValues("updateDocuments");
              setValue("updateDocuments", (current ?? []).concat(document as Document));
            }}
          />
        )}
      />
    </Box>
  );
};
