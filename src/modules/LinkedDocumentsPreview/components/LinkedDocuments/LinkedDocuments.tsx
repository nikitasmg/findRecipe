import { Box } from "@mui/material";
import React, { useMemo, useState } from "react";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import {
  LinkedDocument,
  LinkedDocumentInput,
  useUpdateLinkedDocumentMutation,
  useDeleteLinkedDocumentMutation,
  useDocumentGroupsQuery,
  DocumentGroupInput,
  useUpdateDocumentGroupMutation
} from "~/generated/graphql";
import { DocumentCard } from "~/shared/components/DocumentCard";
import { DocumentDetailsDialog } from "~/shared/components/DocumentDetailsDialog";
import { Text } from "~/shared/components/Text";
import { useModal } from "~/shared/hooks/useModal";
import { getFileFormat } from "~/shared/lib/getFileFormat";

type Props = {
  documents: LinkedDocument[];
  setDocuments: React.Dispatch<React.SetStateAction<LinkedDocument[]>>;
};

export const LinkedDocuments: React.FC<Props> = ({ documents, setDocuments }) => {
  const [activeDocument, setActiveDocument] = useState<LinkedDocument | null>();

  const { open, handleClose, handleOpen } = useModal();

  const onClose = () => {
    setActiveDocument(null);
    handleClose();
  };

  const getHandlerSelectDocument = (document: LinkedDocument | null) => () => {
    setActiveDocument(document);
    handleOpen();
  };

  const client = useGraphqlClient();

  const { mutateAsync: update } = useUpdateLinkedDocumentMutation(client);

  const { mutateAsync: remove } = useDeleteLinkedDocumentMutation(client);

  const { mutateAsync: updateGroup } = useUpdateDocumentGroupMutation(client);

  const { data, refetch } = useDocumentGroupsQuery(
    client,
    {},
    { refetchOnMount: "always", cacheTime: 0 }
  );

  const groups = useMemo(() => data?.documentGroups ?? [], [data]);

  const groupWithActiveDocument = useMemo(() => {
    if (!activeDocument) {
      return activeDocument;
    }

    console.log(groups);

    return groups.find((group) => {
      return group.linked_documents?.find((doc) => doc?.id === activeDocument?.id);
    });
  }, [activeDocument, groups]);

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

    return Promise.resolve(Number(input.id));
  };

  const handleDelete = (id: LinkedDocumentInput["id"]) => {
    if (!id) {
      return;
    }

    remove({ id });

    setDocuments((currentDocuments) => currentDocuments.filter((doc) => doc.id !== id));
  };

  const onGroupUpdate = (input: Pick<DocumentGroupInput, "id" | "linked_documents">) => {
    updateGroup({ input }).then(() => refetch());
  };

  return (
    <Box className='flex flex-col gap-4'>
      {!!documents.length && <Text>Documents</Text>}

      <Box className='flex flex-wrap w-full gap-4'>
        {documents?.map((document) => (
          <DocumentCard
            key={document.id}
            title={document.user_name ?? ""}
            format={getFileFormat(document.user_name ?? "")}
            onCardClick={getHandlerSelectDocument(document)}
          />
        ))}
      </Box>

      <DocumentDetailsDialog
        groups={groups}
        groupId={groupWithActiveDocument?.id}
        open={!!open}
        onClose={onClose}
        document={activeDocument}
        update={handleUpdate}
        onRemove={handleDelete}
        onGroupUpdate={onGroupUpdate}
      />
    </Box>
  );
};
