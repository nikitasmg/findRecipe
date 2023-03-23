import { Autocomplete, Box, TextField } from "@mui/material";
import React, { SyntheticEvent, useState } from "react";
import { Control, Controller, UseFormGetValues } from "react-hook-form";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  LinkedDocument,
  LinkedDocumentInput,
  CreateLinkedDocumentMutation,
  UpdateLinkedDocumentMutation,
  DeleteLinkedDocumentMutation
} from "~/generated/graphql";
import { DocumentCard } from "../DocumentCard";
import { UploadDocumentsButton } from "../UploadDocumentsButton";
import { getFileFormat } from "~/shared/lib/getFileFormat";
import { useModal } from "~/shared/hooks/useModal";
import { DocumentDetailsDialog } from "../DocumentDetailsDialog";
import { Text } from "../Text";

export type LinkedDocumentsFormFields = {
  documents?: LinkedDocument[];
  connectDocuments?: string[];
  disconnectDocuments?: string[];
  updateDocuments?: LinkedDocument[];
};

type Props = {
  allDocuments: LinkedDocument[];
  setValue: (name: keyof LinkedDocumentsFormFields, value: LinkedDocument[] | string[]) => void;
  getValues: UseFormGetValues<LinkedDocumentsFormFields>;
  control: Control<LinkedDocumentsFormFields, unknown>;
  create: ({ input }: { input: LinkedDocumentInput }) => Promise<CreateLinkedDocumentMutation>;
  update: ({ input }: { input: LinkedDocumentInput }) => Promise<UpdateLinkedDocumentMutation>;
  remove: ({ id }: { id: LinkedDocument["id"] }) => Promise<DeleteLinkedDocumentMutation>;
};

export const LinkedDocumentForm: React.FC<Props> = ({
  create,
  update,
  remove,
  setValue,
  getValues,
  control,
  allDocuments = []
}) => {
  const [activeDocument, setActiveDocument] = useState<LinkedDocument | null>();

  const { open, handleClose, handleOpen } = useModal();

  const onUpload = (documents: LinkedDocument[]) => {
    const newConnect = (getValues("connectDocuments") ?? [])?.concat(
      documents.map((doc) => String(doc.id))
    );

    const newDocuments = (getValues("documents") ?? [])?.concat(documents);

    setValue("connectDocuments", newConnect);
    setValue("documents", newDocuments);
  };

  const getHandlerSelectDocument = (document: LinkedDocument | null) => () => {
    setActiveDocument(document);
    handleOpen();
  };

  const onClose = () => {
    setActiveDocument(null);
    handleClose();
  };

  const handleUpdate = (input: LinkedDocumentInput) => {
    update({ input });

    const currentDocuments = getValues("documents") ?? [];

    const updatedDocumentIndex = currentDocuments.findIndex((doc) => doc.id === input.id);

    if (~updatedDocumentIndex) {
      const newDocuments = [...currentDocuments];

      const url = input.upload
        ? URL.createObjectURL(input.upload)
        : newDocuments[updatedDocumentIndex].url;

      newDocuments[updatedDocumentIndex] = {
        id: Number(input.id),
        user_name: input.user_name,
        url
      };

      setValue("documents", newDocuments);
    }

    handleClose();
  };

  const handleDelete = (id: LinkedDocumentInput["id"]) => {
    if (!id) {
      return;
    }

    remove({ id });

    const currentDocuments = getValues("documents") ?? [];

    setValue(
      "documents",
      currentDocuments.filter((doc) => doc.id !== id)
    );
  };

  const handleSelectDocument = (
    e: SyntheticEvent<Element>,
    option: string | { value: LinkedDocument } | null
  ) => {
    if (typeof option !== "object" || !option?.value) {
      return;
    }

    const document = option.value;

    const newConnect = (getValues("connectDocuments") ?? [])?.concat(String(document.id));
    const currentDocuments = getValues("documents") ?? [];

    setValue("documents", currentDocuments.concat(document));
    setValue("connectDocuments", newConnect);
    (e.target as HTMLInputElement).value = "";
  };

  const getUnlinkDocumentHandler = (document: LinkedDocument) => () => {
    if (!document.id) {
      return;
    }

    const currentDocuments = getValues("documents") ?? [];
    const newDisConnect = (getValues("disconnectDocuments") ?? [])?.concat(String(document.id));

    setValue(
      "documents",
      currentDocuments.filter((doc) => doc.id !== document.id)
    );

    setValue("disconnectDocuments", newDisConnect);
  };

  const options = allDocuments?.map((doc) => ({ label: doc.user_name, value: doc }));

  return (
    <Box className='flex flex-col gap-4'>
      <Box className='flex flex-col gap-4 md:items-stretch md:flex-row items-center'>
        <Autocomplete
          disablePortal
          id='documents'
          freeSolo
          className='w-full'
          options={options}
          noOptionsText={<Text>No options</Text>}
          size='small'
          onChange={handleSelectDocument}
          renderOption={(props, option) => (
            <Box component='li' {...props}>
              {option.label}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              InputLabelProps={{
                shrink: true
              }}
              label={<Text>Documents</Text>}
            />
          )}
        />
        <UploadDocumentsButton className='shrink-0' create={create} onUpload={onUpload} />
      </Box>

      <Controller
        control={control}
        name='documents'
        render={({ field: { value } }) => (
          <Box className='flex flex-wrap gap-4'>
            {value?.map((doc) => (
              <Box className='relative' key={doc.id}>
                <DocumentCard
                  title={doc.user_name ?? ""}
                  format={getFileFormat(doc.user_name ?? "")}
                  onCardClick={getHandlerSelectDocument(doc)}
                />
                <CancelIcon
                  tabIndex={0}
                  onKeyPress={getUnlinkDocumentHandler(doc)}
                  onClick={getUnlinkDocumentHandler(doc)}
                  className='absolute top-2 right-2 z-100 text-mainError'
                />
              </Box>
            ))}
          </Box>
        )}
      />

      <DocumentDetailsDialog
        open={!!open}
        onClose={onClose}
        document={activeDocument}
        update={handleUpdate}
        onRemove={handleDelete}
      />
    </Box>
  );
};
