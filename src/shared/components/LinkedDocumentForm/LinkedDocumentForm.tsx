import { Autocomplete, Box, TextField } from "@mui/material";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { Control, Controller, UseFormGetValues } from "react-hook-form";
import CancelIcon from "@mui/icons-material/Cancel";
import { append, compose, concat, equals, filter, not, prop, reduce, when } from "rambda";
import {
  LinkedDocument,
  LinkedDocumentInput,
  CreateLinkedDocumentMutation,
  UpdateLinkedDocumentMutation,
  DeleteLinkedDocumentMutation,
  DocumentGroup,
  DocumentGroupInput,
  LikedDocumentPivotInput
} from "~/generated/graphql";
import { LinkedDocumentsWithoutUpdated } from "~/api/linkedDocuments/overrides";
import { getFileFormat } from "~/shared/lib/getFileFormat";
import { resortArray } from "~/shared/lib/resortArray";
import { useModal } from "~/shared/hooks/useModal";
import { DocumentDetailsDialog } from "../DocumentDetailsDialog";
import { Text } from "../Text";
import { UploadDocumentsButton } from "../UploadDocumentsButton";
import { DocumentCard } from "../DocumentCard";
import { BoxContainerSortable } from "../SortableBox/BoxContainerSortable";
import { BoxItemSortable } from "../SortableBox/BoxItemSortable";
import { useAlertsStore } from "~/shared/stores/alerts";

export type LinkedDocumentsFormFields = {
  documents?: LinkedDocumentsWithoutUpdated[];
  connectDocuments?: string[];
  disconnectDocuments?: string[];
  updateDocuments?: LikedDocumentPivotInput[];
};

type Props = {
  allDocuments: LinkedDocumentsWithoutUpdated[];
  setValue: (
    name: keyof LinkedDocumentsFormFields,
    value: LinkedDocumentsWithoutUpdated[] | string[] | LikedDocumentPivotInput[]
  ) => void;
  getValues: UseFormGetValues<LinkedDocumentsFormFields>;
  control: Control<LinkedDocumentsFormFields, unknown>;
  create: ({ input }: { input: LinkedDocumentInput }) => Promise<CreateLinkedDocumentMutation>;
  update: ({ input }: { input: LinkedDocumentInput }) => Promise<UpdateLinkedDocumentMutation>;
  remove: ({ id }: { id: LinkedDocument["id"] }) => Promise<DeleteLinkedDocumentMutation>;
  groups: Pick<DocumentGroup, "id" | "name">[];
  onGroupUpdate: (input: Pick<DocumentGroupInput, "id" | "linked_documents">) => void;
  groupId?: DocumentGroup["id"];
  onActiveChange?: (active?: LinkedDocumentsWithoutUpdated | null) => void;
  onAddDocuments?: (ids: LinkedDocument["id"][]) => void;
  onResort: (documents: Pick<LinkedDocumentsWithoutUpdated, "id" | "sort">[]) => void;
  onRemoveDocument?: (id: LinkedDocument["id"]) => void;
};

export const LinkedDocumentForm: React.FC<Props> = ({
  create,
  update,
  remove,
  setValue,
  getValues,
  control,
  groups,
  onGroupUpdate,
  onActiveChange,
  groupId,
  onAddDocuments,
  onRemoveDocument,
  onResort,
  allDocuments = []
}) => {
  const [activeDocument, setActiveDocument] = useState<LinkedDocumentsWithoutUpdated | null>();

  const { open, handleClose, handleOpen } = useModal();

  const addAlert = useAlertsStore((state) => state.addAlert);

  const onUpload = (documents: LinkedDocumentsWithoutUpdated[]) => {
    setValue(
      "connectDocuments",
      concat(getValues("connectDocuments") ?? [], documents.map(compose(String, prop("id"))))
    );
    setValue("documents", concat(getValues("documents") ?? [], documents));

    onAddDocuments?.(documents.map((doc) => doc?.id));
  };

  const getHandlerSelectDocument = (document: LinkedDocumentsWithoutUpdated | null) => () => {
    setActiveDocument(document);
    handleOpen();
  };

  const onClose = () => {
    setActiveDocument(null);
    handleClose();
  };

  const handleUpdate = (
    input: LinkedDocumentInput & { created_at?: LinkedDocument["created_at"] }
  ) => {
    update({ input });

    const updateByInputReducer = (
      res: LinkedDocumentsWithoutUpdated[],
      cur: LinkedDocumentsWithoutUpdated
    ) => {
      if (equals(input.id, cur.id)) {
        const url = input.upload ? URL.createObjectURL(input.upload) : cur.url;

        cur = {
          id: Number(input.id),
          user_name: input.user_name,
          user_name_en: input.user_name_en,
          url,
          published: Boolean(input.published),
          created_at: input.created_at
        };
      }

      return append(cur, res);
    };

    setValue("documents", reduce(updateByInputReducer, [], getValues("documents") ?? []));

    handleClose();

    return Promise.resolve(Number(input.id));
  };

  const handleDelete = when<LinkedDocumentInput["id"], void>(Boolean, (id) => {
    remove({ id: id as number });

    setValue(
      "documents",
      filter<LinkedDocumentsWithoutUpdated>(
        compose(not, equals(id), prop("id")),
        getValues("documents") ?? []
      )
    );
  });

  const handleSelectDocument = (
    _: SyntheticEvent<Element>,
    option: string | { value: LinkedDocumentsWithoutUpdated } | null
  ) => {
    if (typeof option !== "object" || !option?.value) {
      return;
    }

    const document = option.value;
    const currentDocuments = getValues("documents") ?? [];

    const newConnect = (getValues("connectDocuments") ?? [])?.concat(String(document.id));

    if (currentDocuments.some((el) => el.id === document.id)) {
      addAlert("warning", "Already exist");
      return;
    }

    setValue("documents", currentDocuments.concat(document));
    setValue("connectDocuments", newConnect);
    onAddDocuments?.([document.id]);
  };

  const getUnlinkDocumentHandler = (document: LinkedDocumentsWithoutUpdated) => () => {
    if (!document.id) {
      return;
    }

    setValue(
      "documents",
      filter(compose(not, equals(document.id), prop("id")), getValues("documents") ?? [])
    );

    setValue(
      "disconnectDocuments",
      (getValues("disconnectDocuments") ?? [])?.concat(String(document.id))
    );

    onRemoveDocument?.(document.id);
  };

  const options = allDocuments?.map((doc) => ({ label: doc.user_name, value: doc }));

  const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
    const currentCardsState = getValues("documents") ?? [];

    const newCardsState = resortArray(oldIndex, newIndex, currentCardsState);

    setValue("documents", newCardsState);

    onResort?.(
      newCardsState
        .slice(0, Math.max(newIndex, oldIndex) + 1)
        .map((item) => ({ id: item.id, sort: item.sort }))
    );
  };

  useEffect(() => {
    onActiveChange?.(activeDocument);
  }, [activeDocument, onActiveChange]);

  return (
    <Box className='flex flex-col gap-10'>
      <Box className='flex flex-col gap-6 md:items-stretch md:flex-row items-center'>
        <Autocomplete
          disablePortal
          id='documents'
          freeSolo
          className='w-full'
          options={options}
          noOptionsText={<Text>No options</Text>}
          size='small'
          onChange={handleSelectDocument}
          renderOption={(props, option) => (
            <Box component='li' {...props} key={option.value.id}>
              {option.label}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              InputLabelProps={{
                shrink: true
              }}
              label={<Text>Documents</Text>}
            />
          )}
        />
        <UploadDocumentsButton className='shrink-0' create={create} onUpload={onUpload} />
      </Box>

      <Controller
        control={control}
        name='documents'
        render={({ field: { value } }) => (
          <BoxContainerSortable
            items={value ?? []}
            className='flex flex-wrap gap-4'
            onSortEnd={onSortEnd}
          >
            {value?.map((doc, i) => (
              <BoxItemSortable className='relative' id={doc.id ?? i} key={doc.id}>
                <DocumentCard
                  title={doc.user_name ?? ""}
                  format={getFileFormat(doc.user_name ?? "")}
                  onCardClick={getHandlerSelectDocument(doc)}
                />
                <CancelIcon
                  tabIndex={0}
                  onKeyPress={getUnlinkDocumentHandler(doc)}
                  onClick={getUnlinkDocumentHandler(doc)}
                  className='absolute top-2 right-2 z-100 text-mainError'
                />
              </BoxItemSortable>
            ))}
          </BoxContainerSortable>
        )}
      />

      <DocumentDetailsDialog
        groups={groups}
        onGroupUpdate={onGroupUpdate}
        groupId={groupId}
        open={!!open}
        onClose={onClose}
        document={activeDocument}
        update={handleUpdate}
        onRemove={handleDelete}
      />
    </Box>
  );
};
