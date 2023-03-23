import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import {
  LinkedDocument,
  useLinkedDocumentsQuery,
  useCreateLinkedDocumentMutation
} from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { Text } from "~/shared/components/Text";
import { UploadDocumentsButton } from "~/shared/components/UploadDocumentsButton";
import { useDocumentsStore } from "~/shared/stores/documents";
import { Groups } from "./components/Groups";
import { LinkedDocuments } from "./components/LinkedDocuments";

export const LinkedDocumentsPreview: React.FC = () => {
  const [documents, setDocuments] = useState<LinkedDocument[]>([]);

  const client = useGraphqlClient();

  const { data, isLoading } = useLinkedDocumentsQuery(client);

  const { mutateAsync: create } = useCreateLinkedDocumentMutation(client);

  const { setCount, setLoading } = useDocumentsStore((state) => ({
    setLoading: state.setLoading,
    setCount: state.setCount
  }));

  const onUpload = (documents: LinkedDocument[]) => {
    setDocuments((cur) => cur.slice().concat(documents));
  };

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  useEffect(() => {
    setCount(documents?.length ?? 0);
  }, [documents, setCount]);

  useEffect(() => {
    setDocuments(data?.linkedDocuments ?? []);
  }, [data]);

  return (
    <Box className='flex flex-col gap-10 p-4'>
      <Box className='flex flex-wrap justify-between gap-6'>
        <Text component='h1' variant='h4' whiteSpace='nowrap'>
          Document manager
        </Text>
        <UploadDocumentsButton onUpload={onUpload} create={create} />
      </Box>
      <Groups />
      <LinkedDocuments documents={documents} setDocuments={setDocuments} />
    </Box>
  );
};
