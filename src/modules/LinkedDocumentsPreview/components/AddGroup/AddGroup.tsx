import { Paper } from "@mui/material";
import React from "react";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import {
  useCreateDocumentGroupMutation,
  DocumentGroup,
  DocumentGroupInput
} from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { Text } from "~/shared/components/Text";
import { useModal } from "~/shared/hooks/useModal";
import { DocumentGroupDetailsDialog } from "~/shared/components/DocumentGroupDetailsDialog";

type Props = {
  onCreate: (group: DocumentGroup) => void;
};

export const AddGroup: React.FC<Props> = ({ onCreate }) => {
  const { open, handleClose, handleOpen } = useModal();

  const client = useGraphqlClient();

  const { mutateAsync: create } = useCreateDocumentGroupMutation(client);

  const handleCreate = (group: Omit<DocumentGroupInput, "id">) => {
    create({ input: group }).then((newGroup) => {
      if (!newGroup.createDocumentGroup) {
        return;
      }

      onCreate(newGroup.createDocumentGroup);
    });
    handleClose();
  };

  const onOpen = () => handleOpen();

  return (
    <>
      <Paper
        elevation={3}
        className='w-[160px] h-[160px] p-4 relative flex flex-col items-center justify-center text-gray-400 rounded-xl hover:bg-slate-200'
        onClick={onOpen}
        onKeyPress={onOpen}
        tabIndex={0}
      >
        <CreateNewFolderIcon className='w-[40%] h-auto' />
        <Text className='text-mainText'>Create group</Text>
      </Paper>

      <DocumentGroupDetailsDialog open={!!open} onClose={handleClose} create={handleCreate} />
    </>
  );
};
