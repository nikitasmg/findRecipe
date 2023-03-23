import { Autocomplete, Box, CircularProgress, TextField } from "@mui/material";
import { compose, prop } from "rambda";
import React, { SyntheticEvent, useEffect, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import {
  DocumentGroup,
  useDocumentGroupByIdQuery,
  LinkedDocument,
  LinkedDocumentInput,
  useUpdateLinkedDocumentMutation,
  useDeleteLinkedDocumentMutation,
  useCreateLinkedDocumentMutation,
  useUpdateDocumentGroupMutation,
  DocumentGroupInput,
  useLinkedDocumentsQuery
} from "~/generated/graphql";
import { DocumentCard } from "~/shared/components/DocumentCard";
import { DocumentDetailsDialog } from "~/shared/components/DocumentDetailsDialog";
import { UploadDocumentsButton } from "~/shared/components/UploadDocumentsButton";
import { useModal } from "~/shared/hooks/useModal";
import { getFileFormat } from "~/shared/lib/getFileFormat";
import { Text } from "~/shared/components/Text";

type Props = {
  groupId: DocumentGroup["id"];
};

export const LinkedDocumentView: React.FC<Props> = ({ groupId }) => {
  const [documents, setDocuments] = useState<LinkedDocument[]>([]);

  const [activeDocument, setActiveDocument] = useState<LinkedDocument | null>();

  const { open, handleClose, handleOpen } = useModal();

  const client = useGraphqlClient();

  const { data, isLoading } = useDocumentGroupByIdQuery(
    client,
    { id: groupId },
    { enabled: !!groupId }
  );

  const { data: allData } = useLinkedDocumentsQuery(client);

  const { mutateAsync: update } = useUpdateLinkedDocumentMutation(client);

  const { mutateAsync: remove } = useDeleteLinkedDocumentMutation(client);

  const { mutateAsync: create } = useCreateLinkedDocumentMutation(client);

  const { mutateAsync: updateGroup } = useUpdateDocumentGroupMutation(client);

  const group = data?.documentGroupById;

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

    setDocuments((currentDocuments) => {
      const newDocuments = [...currentDocuments];

      const updatedDocumentIndex = newDocuments.findIndex((doc) => doc.id === input.id);

      if (~updatedDocumentIndex) {
        const url = input.upload
          ? URL.createObjectURL(input.upload)
          : newDocuments[updatedDocumentIndex].url;

        newDocuments[updatedDocumentIndex] = {
          id: Number(input.id),
          user_name: input.user_name,
          url
        };
      }

      return newDocuments;
    });
  };

  const handleDelete = (id: LinkedDocumentInput["id"]) => {
    if (!id) {
      return;
    }

    remove({ id });

    setDocuments((currentDocuments) => currentDocuments.filter((doc) => doc.id !== id));
  };

  const onUpload = (documents: LinkedDocument[]) => {
    setDocuments((cur) => cur.slice().concat(documents));

    const input: DocumentGroupInput = {
      id: groupId,
      linked_documents: {
        connect: documents.map(compose(String, prop("id")))
      }
    };

    updateGroup({ input });
  };

  const getUnlinkDocumentHandler = (document: LinkedDocument) => () => {
    setDocuments((cur) => cur.filter((doc) => doc.id !== document.id));

    const input: DocumentGroupInput = {
      id: groupId,
      linked_documents: {
        disconnect: [String(document.id)]
      }
    };

    updateGroup({ input });
  };

  const handleSelectDocument = (
    _: SyntheticEvent<Element>,
    option: string | { value: LinkedDocument } | null
  ) => {
    if (typeof option !== "object" || !option?.value) {
      return;
    }

    const input: DocumentGroupInput = {
      id: groupId,
      linked_documents: {
        connect: [String(option.value.id)]
      }
    };

    updateGroup({ input });

    setDocuments((cur) => cur.concat(option.value));
  };

  const options =
    allData?.linkedDocuments?.map((doc) => ({ label: doc.user_name, value: doc })) ?? [];

  useEffect(() => {
    if (!group?.linked_documents) {
      return;
    }

    setDocuments(group.linked_documents as LinkedDocument[]);
  }, [group]);

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

      <Box className='flex flex-wrap gap-4'>
        {documents.map((doc) => {
          return (
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
          );
        })}
      </Box>

      {isLoading && (
        <Box className='w-full flex justify-center items-center h-[200px]'>
          <CircularProgress />
        </Box>
      )}

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
