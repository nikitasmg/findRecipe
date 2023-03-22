import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { LinkedDocument, useLinkedDocumentsQuery } from "~/generated/graphql";
import { DocumentCard } from "~/shared/components/DocumentCard";
import { DocumentDetailsDialog } from "~/shared/components/DocumentDetailsDialog";
import { Text } from "~/shared/components/Text";
import { useModal } from "~/shared/hooks/useModal";
import { useDocumentsStore } from "~/shared/stores/documents";

export const LinkedDocuments: React.FC = () => {
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

  const { data, isLoading } = useLinkedDocumentsQuery(client);

  const documents = data?.linkedDocuments;

  const { setCount, setLoading } = useDocumentsStore((state) => ({
    setLoading: state.setLoading,
    setCount: state.setCount
  }));

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  useEffect(() => {
    setCount(documents?.length ?? 0);
  }, [documents, setCount]);

  return (
    <Box className='flex flex-col gap-4'>
      <Text>Documents</Text>

      <Box className='flex flex-wrap w-full gap-4'>
        {documents?.map((document) => (
          <DocumentCard
            key={document.id}
            title={document.user_name ?? ""}
            format='pdf'
            onCardClick={getHandlerSelectDocument(document)}
          />
        ))}
      </Box>

      <DocumentDetailsDialog open={!!open} onClose={onClose} document={activeDocument} />
    </Box>
  );
};
