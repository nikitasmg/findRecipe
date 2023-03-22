import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { useLinkedDocumentsQuery } from "~/generated/graphql";
import { DocumentCard } from "~/shared/components/DocumentCard";
import { Text } from "~/shared/components/Text";
import { useDocumentsStore } from "~/shared/stores/documents";

export const LinkedDocuments: React.FC = () => {
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
          <DocumentCard key={document.id} title={document.user_name ?? ""} format='pdf' />
        ))}
      </Box>
    </Box>
  );
};
