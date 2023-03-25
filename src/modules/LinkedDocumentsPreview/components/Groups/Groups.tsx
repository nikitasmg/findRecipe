import { Box } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DocumentGroup } from "~/generated/graphql";
import { DocumentGroupDetailsDialog } from "~/shared/components/DocumentGroupDetailsDialog";
import { DragTargetWrapper } from "~/shared/components/DragTargetWrapper";
import { FolderCard } from "~/shared/components/FolderCard";
import { Text } from "~/shared/components/Text";
import { useModal } from "~/shared/hooks/useModal";
import { GroupDocumentsRoute } from "~/shared/routes";
import { AddGroup } from "../AddGroup";
import { GroupsMap } from "../../types";
import { getMapFromLinkedDocuments } from "../../lib/getMapFromLinkedDocuments";
import { useGroupUpdateHandler } from "../../lib/useGroupUpdateHandler";

type Props = {
  setGroups: React.Dispatch<React.SetStateAction<GroupsMap | undefined>>;
  groups?: GroupsMap;
};

export const Groups: React.FC<Props> = ({ groups, setGroups }) => {
  const [activeGroup, setActiveGroup] = useState<DocumentGroup | null>(null);

  const { open, handleClose, handleOpen } = useModal();

  const history = useNavigate();

  const getUpdateHandler = useGroupUpdateHandler(setGroups);

  const onCreate = (newGroup: DocumentGroup) => {
    setGroups((cur) => ({
      ...cur,
      [newGroup.id]: {
        ...newGroup,
        linked_documents: getMapFromLinkedDocuments(newGroup.linked_documents)
      }
    }));
  };

  const getEditClickHandler = (group: GroupsMap[0]) => () => {
    setActiveGroup({
      ...group,
      linked_documents: Object.values(
        group.linked_documents ?? {}
      ) as DocumentGroup["linked_documents"]
    });
    handleOpen();
  };

  const getCardClickHandler = (group: GroupsMap[0]) => () => {
    history(GroupDocumentsRoute.replace(":id", String(group.id)));
  };

  return (
    <Box className='flex flex-col gap-4'>
      <Text variant='h6'>Document groups</Text>
      <Box className='flex flex-wrap w-full gap-4'>
        <AddGroup onCreate={onCreate} />

        {Object.values(groups ?? {})?.map((group) => (
          <DragTargetWrapper
            key={group.id}
            onDrop={getUpdateHandler(group.id)}
            render={({ drop, isActive }) => (
              <FolderCard
                ref={drop}
                isMovePreview={isActive}
                title={group.name}
                countFiles={Object.values(group.linked_documents ?? {})?.length}
                onInfoClick={getEditClickHandler(group)}
                onCardClick={getCardClickHandler(group)}
              />
            )}
          />
        ))}
      </Box>

      <DocumentGroupDetailsDialog open={!!open} onClose={handleClose} group={activeGroup} />
    </Box>
  );
};
