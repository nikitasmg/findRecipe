import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { prop } from "rambda";
import { DndProvider } from "react-dnd";
import { getBackendOptions, MultiBackend } from "@minoru/react-dnd-treeview";
import {
  LinkedDocument,
  useLinkedDocumentsQuery,
  useCreateLinkedDocumentMutation,
  useDocumentGroupsQuery
} from "~/generated/graphql";
import { LinkedDocumentsWithoutUpdated } from "~/api/linkedDocuments/overrides";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { Text } from "~/shared/components/Text";
import { UploadDocumentsButton } from "~/shared/components/UploadDocumentsButton";
import { useDocumentsStore } from "~/shared/stores/documents";
import { useRequestState } from "~/shared/hooks/useRequestState";
import { Groups } from "./components/Groups";
import { LinkedDocuments } from "./components/LinkedDocuments";
import { GroupsMap } from "./types";
import { getMapFromLinkedDocuments } from "./lib/getMapFromLinkedDocuments";

export const LinkedDocumentsPreview: React.FC = () => {
  const [documents, setDocuments] = useState<LinkedDocumentsWithoutUpdated[]>([]);

  const [groups, setGroups] = useState<GroupsMap>();

  const { variables, activeOrder, handleChangeOrder } = useRequestState("name");

  const client = useGraphqlClient();

  const { data, isLoading } = useLinkedDocumentsQuery(client, variables, {
    refetchOnMount: "always",
    cacheTime: 0
  });

  const { data: groupsData } = useDocumentGroupsQuery(client, {}, { refetchOnMount: "always" });

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

  useEffect(() => {
    const groupsMap: GroupsMap = groupsData?.documentGroups.reduce((res, cur) => {
      if (cur) {
        res[prop("id", cur)] = {
          ...cur,
          linked_documents: getMapFromLinkedDocuments(cur.linked_documents)
        };
      }

      return res;
    }, Object.create(null));

    setGroups(groupsMap);
  }, [groupsData]);

  return (
    <Box className='flex flex-col gap-10'>
      <DndProvider backend={MultiBackend} options={getBackendOptions()}>
        <Box className='flex flex-wrap justify-between gap-6'>
          <Text component='h1' variant='h4' whiteSpace='nowrap'>
            Document manager
          </Text>
          <UploadDocumentsButton onUpload={onUpload} create={create} />
        </Box>
        <Groups groups={groups} setGroups={setGroups} />

        <LinkedDocuments
          groups={groups}
          isLoading={isLoading}
          activeOrder={activeOrder}
          handleChangeOrder={handleChangeOrder}
          documents={documents}
          setDocuments={setDocuments}
        />
      </DndProvider>
    </Box>
  );
};
