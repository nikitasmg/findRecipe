import {
  Box,
  Drawer,
  FormControl,
  FormControlLabel,
  MenuItem,
  Switch,
  TextField
} from "@mui/material";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  DocumentGroup,
  DocumentGroupInput,
  LinkedDocument,
  LinkedDocumentInput
} from "~/generated/graphql";
import { LinkedDocumentsWithoutUpdated } from "~/api/linkedDocuments/overrides";
import { getErrorMessage } from "~/shared/lib/getError";
import { baseMaxLength, baseMaxLengthRequired, baseRequired } from "~/shared/lib/validation";
import { getFileFormat } from "~/shared/lib/getFileFormat";
import { getFileName } from "~/shared/lib/getFileName";
import { getCheckedHandler } from "~/shared/lib/getCheckedHandler";
import { HelperText } from "../HelperText";
import { RequiredLabelWrapper } from "../RequiredLabelWrapper";
import { Text } from "../Text";
import { FileInput } from "../FileInput";
import { SaveButton } from "../SaveButton";
import { DatePicker } from "../DatePicker";
import { ButtonDelete } from "../ButtonDelete";
import { EnLabelWrapper } from "../EnLabelWrapper";

type Props = {
  open: boolean;
  onClose: () => void;
  groups: Pick<DocumentGroup, "id" | "name">[];
  onGroupUpdate: (input: Pick<DocumentGroupInput, "id" | "linked_documents">) => void;
  groupId?: DocumentGroup["id"];
  create?: (document: LinkedDocumentInput) => Promise<number>;
  update?: (
    document: LinkedDocumentInput & { created_at?: LinkedDocument["created_at"] }
  ) => Promise<number>;
  onRemove?: (id: LinkedDocumentInput["id"]) => void;
  document?: LinkedDocumentsWithoutUpdated | null;
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
    getValues
  } = useForm({ mode: "all" });

  const getError = getErrorMessage(errors);

  const isCreate = !document?.id;

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.stopPropagation();
    e.preventDefault();

    handleSubmit(async (newValues) => {
      const input: LinkedDocumentInput = {
        ...(Boolean(!isCreate) && { id: document?.id }),
        ...(Boolean(newValues.file) && { upload: newValues.file }),
        user_name: `${newValues.title}.${newValues.format}`,
        user_name_en: newValues.user_name_en,
        published: newValues.published ?? false
      };

      let connectId: number | null = null;

      if (isCreate) {
        await create?.(input).then((id) => {
          connectId = id;
        });
      } else {
        await update?.({ ...input, created_at: newValues.created_at }).then((id) => {
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

  const handleChecked = getCheckedHandler(setValue);

  useEffect(() => {
    setValue("title", getFileName(document?.user_name ?? ""));
    setValue("url", document?.url);
    setValue("format", getFileFormat(document?.user_name ?? ""));
    setValue("user_name_en", document?.user_name_en);
    setValue("groupId", groupId);
    setValue("published", document?.published);
    setValue("created_at", isCreate ? new Date() : document?.created_at);
  }, [document, setValue, groupId, isCreate]);

  return (
    <Drawer anchor='right' open={open} onClose={onClose}>
      <Box className='flex flex-col gap-10 p-6 w-[360px]' component='form' onSubmit={onSubmit}>
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
                {...register("title", baseMaxLengthRequired)}
              />

              <HelperText id='title' error={getError("title")} />
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name='user_name_en'
          render={({ field }) => (
            <FormControl fullWidth>
              <TextField
                fullWidth
                label={
                  <EnLabelWrapper>
                    <Text>Title</Text>
                  </EnLabelWrapper>
                }
                {...field}
                error={!!getError("user_name_en")}
                {...register("user_name_en", baseMaxLength)}
              />

              <HelperText id='user_name_en' error={getError("user_name_en")} />
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
                onDrop={(file) => {
                  setValue("file", file);

                  const format = getFileFormat(file?.name ?? "");

                  setValue("format", format);
                  setValue("title", getFileName(file?.name ?? ""));
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
                <MenuItem sx={{ width: "300px" }} key={group.id} value={group.id}>
                  {group.name}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <Controller
          control={control}
          name='published'
          render={({ field: { value } }) => (
            <FormControlLabel
              control={<Switch checked={!!value} onChange={handleChecked("published")} />}
              label={<Text>Published</Text>}
            />
          )}
        />

        <Controller
          control={control}
          name='created_at'
          render={({ field: { value, onChange } }) => (
            <DatePicker
              disabled
              onChange={onChange}
              className='w-full'
              label={<Text>Date create</Text>}
              value={value ?? null}
            />
          )}
        />

        <Box className='flex gap-2'>
          {onRemove && <ButtonDelete className='flex-1' onClick={handleDelete} />}

          <SaveButton className='flex-1' />
        </Box>
      </Box>
    </Drawer>
  );
};
