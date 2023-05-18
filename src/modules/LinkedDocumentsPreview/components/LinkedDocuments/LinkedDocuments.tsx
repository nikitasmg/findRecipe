import { Box, Skeleton } from "@mui/material";
import React, { useMemo, useState } from "react";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import { compose, concat, equals, filter, not, prop, reduce, when, append } from "rambda";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import {
  LinkedDocument,
  LinkedDocumentInput,
  useUpdateLinkedDocumentMutation,
  useDeleteLinkedDocumentMutation,
  DocumentGroupInput,
  useUpdateDocumentGroupMutation,
  useCreateLinkedDocumentMutation
} from "~/generated/graphql";
import { LinkedDocumentsWithoutUpdated } from "~/api/linkedDocuments/overrides";
import { DocumentCard } from "~/shared/components/DocumentCard";
import { DocumentDetailsDialog } from "~/shared/components/DocumentDetailsDialog";
import { Text } from "~/shared/components/Text";
import { Button } from "~/shared/components/Button";
import { DragSourceWrapper } from "~/shared/components/DragSourceWrapper";
import { useModal } from "~/shared/hooks/useModal";
import { getFileFormat } from "~/shared/lib/getFileFormat";
import { ActiveOrder } from "~/shared/types/ActiveOrder";
import { DocumentsSorting } from "../DocumentsSorting";
import { GroupsMap } from "../../types";

type Props = {
  activeOrder: ActiveOrder;
  documents: LinkedDocumentsWithoutUpdated[];
  isLoading: boolean;
  handleChangeOrder: (order: ActiveOrder) => void;
  setDocuments: React.Dispatch<React.SetStateAction<LinkedDocumentsWithoutUpdated[]>>;
  groups?: GroupsMap;
};

export const LinkedDocuments: React.FC<Props> = ({
  documents,
  setDocuments,
  activeOrder,
  isLoading,
  handleChangeOrder,
  groups
}) => {
  const [activeDocument, setActiveDocument] = useState<LinkedDocumentsWithoutUpdated | null>();

  const { open, handleClose, handleOpen } = useModal();

  const onClose = () => {
    setActiveDocument(null);
    handleClose();
  };

  const getHandlerSelectDocument = (document: LinkedDocumentsWithoutUpdated | null) => () => {
    setActiveDocument(document);
    handleOpen();
  };

  const client = useGraphqlClient();

  const { mutateAsync: create } = useCreateLinkedDocumentMutation(client);

  const { mutateAsync: update } = useUpdateLinkedDocumentMutation(client);

  const { mutateAsync: remove } = useDeleteLinkedDocumentMutation(client);

  const { mutateAsync: updateGroup } = useUpdateDocumentGroupMutation(client);

  const groupWithActiveDocument = useMemo(() => {
    if (!activeDocument) {
      return activeDocument;
    }

    return Object.values(groups ?? {}).find((group) => {
      return (group.linked_documents ?? {})[activeDocument.id];
    });
  }, [activeDocument, groups]);

  const handleUpdate = (
    values: LinkedDocumentInput & { created_at?: LinkedDocument["created_at"] }
  ) => {
    const input = { ...values };
    delete input.created_at;
    update({ input });

    const updateByInputReducer = (
      res: LinkedDocumentsWithoutUpdated[],
      cur: LinkedDocumentsWithoutUpdated
    ) => {
      if (equals(values.id, cur.id)) {
        const url = values.upload ? URL.createObjectURL(values.upload) : cur.url;

        cur = {
          id: Number(values.id),
          user_name: values.user_name,
          url,
          published: Boolean(values.published),
          created_at: values.created_at
        };
      }

      return append(cur, res);
    };

    setDocuments(reduce(updateByInputReducer, []));
    onClose();

    return Promise.resolve(Number(input.id));
  };

  const handleCreate = (document: LinkedDocumentInput) => {
    const createPromise = create({ input: document });

    createPromise
      .then(
        compose(
          when(not, (newDocument: LinkedDocumentsWithoutUpdated) =>
            setDocuments(compose(concat([newDocument]), Array.prototype.slice.bind))
          ),
          prop("createLinkedDocument")
        )
      )
      .then(onClose);

    return createPromise.then(compose(Number, prop("id"), prop("createLinkedDocument")));
  };

  const handleDelete = when<LinkedDocumentInput["id"], void>(Boolean, (id) => {
    remove({ id: id as number });

    setDocuments(filter<LinkedDocumentsWithoutUpdated>(compose(not, equals(id), prop("id"))));
  });

  const onGroupUpdate = (input: Pick<DocumentGroupInput, "id" | "linked_documents">) => {
    updateGroup({ input });
  };

  const groupsOptions = Object.values(groups ?? {}).map((group) => ({
    id: group.id,
    name: group.name
  }));

  return (
    <Box className='flex flex-col gap-4'>
      <Box className='flex items-center justify-between'>
        <Text variant='h6'>Documents</Text>
        <Button
          variant='outlined'
          onClick={getHandlerSelectDocument(null)}
          startIcon={<AddBoxRoundedIcon />}
        >
          Add
        </Button>
      </Box>

      <DocumentsSorting activeOrder={activeOrder} handleChangeOrder={handleChangeOrder} />

      <Box className='flex flex-wrap w-full gap-4'>
        {isLoading &&
          Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className='w-[160px] rounded-lg' variant='rectangular' height={160} />
          ))}

        {documents?.map((document) => (
          <DragSourceWrapper
            key={document.id}
            item={document}
            render={({ drag, style }) => (
              <DocumentCard
                ref={drag}
                style={style}
                title={document.user_name ?? ""}
                format={getFileFormat(document.user_name ?? "")}
                onCardClick={getHandlerSelectDocument(document)}
              />
            )}
          />
        ))}
      </Box>

      {open && (
        <DocumentDetailsDialog
          groups={groupsOptions}
          groupId={groupWithActiveDocument?.id}
          open={!!open}
          onClose={onClose}
          document={activeDocument}
          create={handleCreate}
          update={handleUpdate}
          onRemove={handleDelete}
          onGroupUpdate={onGroupUpdate}
        />
      )}
    </Box>
  );
};
