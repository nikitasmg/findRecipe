import React, { ReactNode, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { SortableContainer } from "react-sortable-hoc";
import {
  LinkedDocument,
  useLinkedDocumentsQuery,
  useCreateLinkedDocumentMutation
} from "~/generated/graphql";
import { LinkedDocumentsWithoutUpdated } from "~/api/overrides";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { Text } from "~/shared/components/Text";
import { UploadDocumentsButton } from "~/shared/components/UploadDocumentsButton";
import { useDocumentsStore } from "~/shared/stores/documents";
import { Groups } from "./components/Groups";
import { LinkedDocuments } from "./components/LinkedDocuments";
import { useRequestState } from "~/shared/hooks/useRequestState";

export const DocumentsContainerSortable = SortableContainer<{ children: ReactNode }>(
  ({ children }: { children: ReactNode }) => (
    <Box className='flex flex-col gap-10 p-4'>{children}</Box>
  )
);

export const LinkedDocumentsPreview: React.FC = () => {
  const [documents, setDocuments] = useState<LinkedDocumentsWithoutUpdated[]>([]);

  const { variables, activeOrder, handleChangeOrder } = useRequestState("name");

  const client = useGraphqlClient();

  const { data, isLoading } = useLinkedDocumentsQuery(client, variables, {
    refetchOnMount: "always",
    cacheTime: 0
  });

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
    <DocumentsContainerSortable axis='xy' distance={10} useDragHandle onSortEnd={() => undefined}>
      <Box className='flex flex-wrap justify-between gap-6'>
        <Text component='h1' variant='h4' whiteSpace='nowrap'>
          Document manager
        </Text>
        <UploadDocumentsButton onUpload={onUpload} create={create} />
      </Box>
      <Groups />

      <LinkedDocuments
        isLoading={isLoading}
        activeOrder={activeOrder}
        handleChangeOrder={handleChangeOrder}
        documents={documents}
        setDocuments={setDocuments}
      />
    </DocumentsContainerSortable>
  );
};
