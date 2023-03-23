import { Box, Skeleton, Typography } from "@mui/material";
import React, { ReactNode, useMemo, useState } from "react";
import { SortableElement } from "react-sortable-hoc";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import {
  LinkedDocument,
  LinkedDocumentInput,
  useUpdateLinkedDocumentMutation,
  useDeleteLinkedDocumentMutation,
  useDocumentGroupsQuery,
  DocumentGroupInput,
  useUpdateDocumentGroupMutation,
  SortOrder,
  useCreateLinkedDocumentMutation
} from "~/generated/graphql";
import { DocumentCard } from "~/shared/components/DocumentCard";
import { DocumentDetailsDialog } from "~/shared/components/DocumentDetailsDialog";
import { TableHeadCell } from "~/shared/components/TableHeadLabel";
import { Text } from "~/shared/components/Text";
import { Button } from "~/shared/components/Button";
import { useModal } from "~/shared/hooks/useModal";
import { getFileFormat } from "~/shared/lib/getFileFormat";
import { ActiveOrder } from "~/shared/types/ActiveOrder";

export const DocumentWrapperSortable = SortableElement<{ children: ReactNode }>(
  ({ children }: { children: ReactNode }) => {
    return (
      <Box role='row' tabIndex={0}>
        {children}
      </Box>
    );
  }
);

type Props = {
  activeOrder: ActiveOrder;
  documents: LinkedDocument[];
  isLoading: boolean;
  handleChangeOrder: (order: ActiveOrder) => void;
  setDocuments: React.Dispatch<React.SetStateAction<LinkedDocument[]>>;
};

export const LinkedDocuments: React.FC<Props> = ({
  documents,
  setDocuments,
  activeOrder,
  isLoading,
  handleChangeOrder
}) => {
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

  const { mutateAsync: create } = useCreateLinkedDocumentMutation(client);

  const { mutateAsync: update } = useUpdateLinkedDocumentMutation(client);

  const { mutateAsync: remove } = useDeleteLinkedDocumentMutation(client);

  const { mutateAsync: updateGroup } = useUpdateDocumentGroupMutation(client);

  const { data, refetch } = useDocumentGroupsQuery(
    client,
    {},
    { refetchOnMount: "always", cacheTime: 0 }
  );

  const groups = useMemo(() => data?.documentGroups ?? [], [data]);

  const groupWithActiveDocument = useMemo(() => {
    if (!activeDocument) {
      return activeDocument;
    }

    return groups.find((group) => {
      return group.linked_documents?.find((doc) => doc?.id === activeDocument?.id);
    });
  }, [activeDocument, groups]);

  const handleUpdate = (input: LinkedDocumentInput) => {
    update({ input });

    setDocuments((currentDocuments) => {
      const newDocuments = [...currentDocuments];

      const updatedDocumentIndex = newDocuments.findIndex((doc) => doc.id === input.id);

      if (~updatedDocumentIndex) {
        const url = input.upload
          ? URL.createObjectURL(input.upload)
          : newDocuments[updatedDocumentIndex].url;

        newDocuments[updatedDocumentIndex] = {
          id: Number(input.id),
          user_name: input.user_name,
          url
        };
      }

      return newDocuments;
    });

    return Promise.resolve(Number(input.id));
  };

  const handleCreate = (document: Omit<LinkedDocumentInput, "id">) => {
    return create({ input: document })
      .then((data) => {
        setDocuments((currentDocuments) => {
          const newDocument = data.createLinkedDocument;

          if (!newDocument) {
            return currentDocuments;
          }

          return currentDocuments.slice().concat(newDocument);
        });

        onClose();
        return data;
      })
      .then((data) => Number(data.createLinkedDocument?.id));
  };

  const handleDelete = (id: LinkedDocumentInput["id"]) => {
    if (!id) {
      return;
    }

    remove({ id });

    setDocuments((currentDocuments) => currentDocuments.filter((doc) => doc.id !== id));
  };

  const onGroupUpdate = (input: Pick<DocumentGroupInput, "id" | "linked_documents">) => {
    updateGroup({ input }).then(() => refetch());
  };

  const getClickHandler = (name: string) => () => {
    if (activeOrder?.[name] && activeOrder[name] === SortOrder.Desc) {
      return handleChangeOrder?.(null);
    }

    const direction = activeOrder?.[name] === SortOrder.Asc ? SortOrder.Desc : SortOrder.Asc;

    return handleChangeOrder?.({ [name]: direction });
  };

  const getActiveProps = (name: string) => ({
    active: !!activeOrder?.[name],
    direction: (activeOrder?.[name]
      ? activeOrder[name].toLocaleLowerCase()
      : "desc") as Lowercase<SortOrder>
  });

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

      <Box className='flex flex-col md:flex-row gap-6'>
        <Typography component='p'>
          <Text component='span'>Sort by</Text>:
        </Typography>
        <TableHeadCell
          title='ID'
          cellId='id'
          onSortClick={getClickHandler("id")}
          sortProps={getActiveProps("id")}
        />
        <TableHeadCell
          title='Title'
          cellId='user_name'
          onSortClick={getClickHandler("user_name")}
          sortProps={getActiveProps("user_name")}
        />
      </Box>

      <Box className='flex flex-wrap w-full gap-4'>
        {isLoading &&
          Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className='w-[160px] rounded-lg' variant='rectangular' height={160} />
          ))}

        {documents?.map((document, index) => (
          <DocumentWrapperSortable index={index} key={document.id}>
            <DocumentCard
              title={document.user_name ?? ""}
              format={getFileFormat(document.user_name ?? "")}
              onCardClick={getHandlerSelectDocument(document)}
            />
          </DocumentWrapperSortable>
        ))}
      </Box>

      <DocumentDetailsDialog
        groups={groups}
        groupId={groupWithActiveDocument?.id}
        open={!!open}
        onClose={onClose}
        document={activeDocument}
        create={handleCreate}
        update={handleUpdate}
        onRemove={handleDelete}
        onGroupUpdate={onGroupUpdate}
      />
    </Box>
  );
};
