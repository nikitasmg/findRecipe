import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { useDocumentGroupsQuery, DocumentGroup } from "~/generated/graphql";
import { DocumentGroupDetailsDialog } from "~/shared/components/DocumentGroupDetailsDialog";
import { FolderCard } from "~/shared/components/FolderCard";
import { Text } from "~/shared/components/Text";
import { useModal } from "~/shared/hooks/useModal";
import { GroupDocumentsRoute } from "~/shared/routes";
import { AddGroup } from "../AddGroup";

export const Groups = () => {
  const [groups, setGroups] = useState<DocumentGroup[]>([]);

  const [activeGroup, setActiveGroup] = useState<DocumentGroup | null>(null);

  const { open, handleClose, handleOpen } = useModal();

  const history = useNavigate();

  const client = useGraphqlClient();

  const { data } = useDocumentGroupsQuery(client, {}, { refetchOnMount: "always" });

  const onCreate = (newGroup: DocumentGroup) => {
    setGroups((cur) => cur.slice().concat(newGroup));
  };

  const getEditClickHandler = (group: DocumentGroup) => () => {
    setActiveGroup(group);
    handleOpen();
  };

  const getCardClickHandler = (group: DocumentGroup) => () => {
    history(GroupDocumentsRoute.replace(":id", String(group.id)));
  };

  useEffect(() => {
    setGroups(data?.documentGroups ?? []);
  }, [data]);

  return (
    <Box className='flex flex-col gap-4'>
      <Text variant='h6'>Document groups</Text>
      <Box className='flex flex-wrap w-full gap-4'>
        <AddGroup onCreate={onCreate} />

        {groups?.map((group) => (
          <FolderCard
            key={group.id}
            title={group.name}
            countFiles={group.linked_documents?.length}
            onInfoClick={getEditClickHandler(group)}
            onCardClick={getCardClickHandler(group)}
          />
        ))}
      </Box>

      <DocumentGroupDetailsDialog open={!!open} onClose={handleClose} group={activeGroup} />
    </Box>
  );
};
