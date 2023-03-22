import { Box } from "@mui/material";
import React from "react";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { useDocumentGroupsQuery } from "~/generated/graphql";
import { FolderCard } from "~/shared/components/FolderCard";
import { Text } from "~/shared/components/Text";

export const Groups = () => {
  const client = useGraphqlClient();

  const { data } = useDocumentGroupsQuery(client);

  const groups = data?.documentGroups;

  return (
    <Box className='flex flex-col gap-4'>
      <Text>Document groups</Text>
      <Box className='flex flex-wrap w-full gap-4'>
        {groups?.map((group) => (
          <FolderCard
            key={group.id}
            title={group.name}
            countFiles={group.linked_documents?.length}
          />
        ))}
      </Box>
    </Box>
  );
};
