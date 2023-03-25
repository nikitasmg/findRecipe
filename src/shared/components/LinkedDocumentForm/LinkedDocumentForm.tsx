import { Autocomplete, Box, TextField } from "@mui/material";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { Control, Controller, UseFormGetValues } from "react-hook-form";
import CancelIcon from "@mui/icons-material/Cancel";
import { append, compose, concat, equals, filter, not, prop, reduce, when } from "rambda";
import {
  LinkedDocument,
  LinkedDocumentInput,
  CreateLinkedDocumentMutation,
  UpdateLinkedDocumentMutation,
  DeleteLinkedDocumentMutation,
  DocumentGroup,
  DocumentGroupInput
} from "~/generated/graphql";
import { LinkedDocumentsWithoutUpdated } from "~/api/linkedDocuments/overrides";
import { getFileFormat } from "~/shared/lib/getFileFormat";
import { useModal } from "~/shared/hooks/useModal";
import { DocumentDetailsDialog } from "../DocumentDetailsDialog";
import { Text } from "../Text";
import { UploadDocumentsButton } from "../UploadDocumentsButton";
import { DocumentCard } from "../DocumentCard";

export type LinkedDocumentsFormFields = {
  documents?: LinkedDocumentsWithoutUpdated[];
  connectDocuments?: string[];
  disconnectDocuments?: string[];
  updateDocuments?: LinkedDocumentsWithoutUpdated[];
};

type Props = {
  allDocuments: LinkedDocumentsWithoutUpdated[];
  setValue: (
    name: keyof LinkedDocumentsFormFields,
    value: LinkedDocumentsWithoutUpdated[] | string[]
  ) => void;
  getValues: UseFormGetValues<LinkedDocumentsFormFields>;
  control: Control<LinkedDocumentsFormFields, unknown>;
  create: ({ input }: { input: LinkedDocumentInput }) => Promise<CreateLinkedDocumentMutation>;
  update: ({ input }: { input: LinkedDocumentInput }) => Promise<UpdateLinkedDocumentMutation>;
  remove: ({ id }: { id: LinkedDocument["id"] }) => Promise<DeleteLinkedDocumentMutation>;
  groups: Pick<DocumentGroup, "id" | "name">[];
  onGroupUpdate: (input: Pick<DocumentGroupInput, "id" | "linked_documents">) => void;
  groupId?: DocumentGroup["id"];
  onActiveChange?: (active?: LinkedDocumentsWithoutUpdated | null) => void;
};

export const LinkedDocumentForm: React.FC<Props> = ({
  create,
  update,
  remove,
  setValue,
  getValues,
  control,
  groups,
  onGroupUpdate,
  onActiveChange,
  groupId,
  allDocuments = []
}) => {
  const [activeDocument, setActiveDocument] = useState<LinkedDocumentsWithoutUpdated | null>();

  const { open, handleClose, handleOpen } = useModal();

  const onUpload = (documents: LinkedDocumentsWithoutUpdated[]) => {
    setValue(
      "connectDocuments",
      concat(getValues("connectDocuments") ?? [], documents.map(compose(String, prop("id"))))
    );
    setValue("documents", concat(getValues("documents") ?? [], documents));
  };

  const getHandlerSelectDocument = (document: LinkedDocumentsWithoutUpdated | null) => () => {
    setActiveDocument(document);
    handleOpen();
  };

  const onClose = () => {
    setActiveDocument(null);
    handleClose();
  };

  const handleUpdate = (
    input: LinkedDocumentInput & { created_at: LinkedDocument["created_at"] }
  ) => {
    update({ input });

    const updateByInputReducer = (
      res: LinkedDocumentsWithoutUpdated[],
      cur: LinkedDocumentsWithoutUpdated
    ) => {
      if (equals(input.id, cur.id)) {
        const url = input.upload ? URL.createObjectURL(input.upload) : cur.url;

        cur = {
          id: Number(input.id),
          user_name: input.user_name,
          url,
          published: Boolean(input.published),
          created_at: input.created_at
        };
      }

      return append(cur, res);
    };

    setValue("documents", reduce(updateByInputReducer, [], getValues("documents") ?? []));

    handleClose();

    return Promise.resolve(Number(input.id));
  };

  const handleDelete = when<LinkedDocumentInput["id"], void>(Boolean, (id) => {
    remove({ id: id as number });

    setValue(
      "documents",
      filter<LinkedDocumentsWithoutUpdated>(
        compose(not, equals(id), prop("id")),
        getValues("documents") ?? []
      )
    );
  });

  const handleSelectDocument = (
    _: SyntheticEvent<Element>,
    option: string | { value: LinkedDocumentsWithoutUpdated } | null
  ) => {
    if (typeof option !== "object" || !option?.value) {
      return;
    }

    const document = option.value;

    const newConnect = (getValues("connectDocuments") ?? [])?.concat(String(document.id));
    const currentDocuments = getValues("documents") ?? [];

    setValue("documents", currentDocuments.concat(document));
    setValue("connectDocuments", newConnect);
  };

  const getUnlinkDocumentHandler = (document: LinkedDocumentsWithoutUpdated) => () => {
    if (!document.id) {
      return;
    }

    setValue(
      "documents",
      filter(compose(equals(document.id), prop("id")), getValues("documents") ?? [])
    );

    setValue(
      "disconnectDocuments",
      (getValues("disconnectDocuments") ?? [])?.concat(String(document.id))
    );
  };

  const options = allDocuments?.map((doc) => ({ label: doc.user_name, value: doc }));

  useEffect(() => {
    onActiveChange?.(activeDocument);
  }, [activeDocument, onActiveChange]);

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
        groups={groups}
        onGroupUpdate={onGroupUpdate}
        groupId={groupId}
        open={!!open}
        onClose={onClose}
        document={activeDocument}
        update={handleUpdate}
        onRemove={handleDelete}
      />
    </Box>
  );
};
