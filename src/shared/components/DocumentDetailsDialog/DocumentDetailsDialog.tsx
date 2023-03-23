import { Box, Drawer, FormControl, MenuItem, TextField } from "@mui/material";
import React, { useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Controller, useForm } from "react-hook-form";
import {
  DocumentGroup,
  DocumentGroupInput,
  LinkedDocument,
  LinkedDocumentInput
} from "~/generated/graphql";
import { getErrorMessage } from "~/shared/lib/getError";
import { baseRequired } from "~/shared/lib/validation";
import { getFileFormat } from "~/shared/lib/getFileFormat";
import { getFileName } from "~/shared/lib/getFileName";
import { Button } from "../Button";
import { HelperText } from "../HelperText";
import { RequiredLabelWrapper } from "../RequiredLabelWrapper";
import { Text } from "../Text";
import { FileInput } from "../FileInput";
import { SaveButton } from "../SaveButton";

type Props = {
  open: boolean;
  onClose: () => void;
  groups: Pick<DocumentGroup, "id" | "name">[];
  onGroupUpdate: (input: Pick<DocumentGroupInput, "id" | "linked_documents">) => void;
  groupId?: DocumentGroup["id"];
  create?: (document: Omit<LinkedDocumentInput, "id">) => Promise<number>;
  update?: (document: LinkedDocumentInput) => Promise<number>;
  onRemove?: (id: LinkedDocumentInput["id"]) => void;
  document?: LinkedDocument | null;
};

export const DocumentDetailsDialog: React.FC<Props> = ({
  open,
  onClose,
  groups,
  groupId,
  document,
  onRemove,
  create,
  update,
  onGroupUpdate
}) => {
  const {
    register,
    control,
    setValue,
    formState: { errors },
    handleSubmit,
    getValues,
    reset
  } = useForm({ mode: "all" });

  const getError = getErrorMessage(errors);

  const isCreate = !document?.id;

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.stopPropagation();
    e.preventDefault();

    handleSubmit(async (newValues) => {
      const input = {
        ...(Boolean(!isCreate) && { id: document?.id }),
        ...(Boolean(newValues.file) && { upload: newValues.file }),
        user_name: `${newValues.title}.${newValues.format}`
      };

      let connectId: number | null = null;

      if (isCreate) {
        await create?.(input).then((id) => {
          connectId = id;
        });
      } else {
        await update?.(input).then((id) => {
          connectId = id;
        });
      }

      if (!newValues.groupId && !groupId) {
        return;
      }

      if (groupId) {
        onGroupUpdate({
          id: groupId,
          linked_documents: {
            disconnect: [String(connectId)]
          }
        });
      }

      if (newValues.groupId) {
        onGroupUpdate({
          id: newValues.groupId,
          linked_documents: {
            connect: [String(connectId)]
          }
        });
      }

      onClose?.();
    })(e);
  };

  const handleDelete = () => {
    if (document?.id) {
      onRemove?.(document.id);
    }

    onClose();
  };

  useEffect(() => {
    setValue("title", getFileName(document?.user_name ?? ""));
    setValue("url", document?.url);
    setValue("format", getFileFormat(document?.user_name ?? ""));
    setValue("groupId", groupId);
  }, [document, setValue, groupId]);

  useEffect(() => reset, [reset]);

  return (
    <Drawer anchor='right' open={open} onClose={onClose}>
      <Box className='flex flex-col gap-10 p-6' component='form' onSubmit={onSubmit}>
        <Text variant='h5'>{document ? "Edit document" : "Create document"}</Text>

        <Controller
          control={control}
          name='title'
          render={({ field }) => (
            <FormControl fullWidth>
              <TextField
                fullWidth
                label={
                  <RequiredLabelWrapper>
                    <Text>Title</Text>
                  </RequiredLabelWrapper>
                }
                {...field}
                error={!!getError("title")}
                {...register("title", baseRequired)}
              />

              <HelperText id='title' error={getError("title")} />
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name='url'
          rules={baseRequired}
          render={({ field: { value } }) => (
            <FormControl fullWidth error={!!getError("title")}>
              <FileInput
                id='file-input'
                url={value}
                fileName={getValues("title")}
                onFileChange={(file) => {
                  setValue("file", file);

                  const format = getFileFormat(file?.name ?? "");

                  setValue("format", format);
                  setValue("title", getFileName(file?.name ?? ""));
                }}
                onUrlChange={(url = "") => {
                  setValue("url", url);
                }}
                onDelete={() => {
                  setValue("url", "");
                  setValue("file", null);
                  setValue("title", "");
                  setValue("format", "");
                }}
              />

              <HelperText id='url' error={getError("url")} />
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name='groupId'
          render={({ field: { value, onChange } }) => (
            <TextField
              select
              name='groupId'
              variant='outlined'
              label={<Text>Document category</Text>}
              SelectProps={{
                value: value ?? "",
                name: "groupId",
                onChange: onChange
              }}
            >
              <MenuItem key={"empty"} value={""}>
                <Text>Not selected</Text>
              </MenuItem>
              {groups.map((group) => (
                <MenuItem key={group.id} value={group.id}>
                  {group.name}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <Box className='flex gap-2'>
          {onRemove && (
            <Button
              className='flex-1'
              color='error'
              type='button'
              variant='outlined'
              startIcon={<DeleteIcon />}
              onClick={handleDelete}
            >
              Delete
            </Button>
          )}

          <SaveButton className='flex-1' />
        </Box>
      </Box>
    </Drawer>
  );
};
