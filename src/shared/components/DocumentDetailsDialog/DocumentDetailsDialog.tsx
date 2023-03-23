import { Box, Drawer, FormControl, TextField } from "@mui/material";
import React, { useEffect } from "react";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import { Controller, useForm } from "react-hook-form";
import { LinkedDocument, LinkedDocumentInput } from "~/generated/graphql";
import { getErrorMessage } from "~/shared/lib/getError";
import { baseRequired } from "~/shared/lib/validation";
import { getFileFormat } from "~/shared/lib/getFileFormat";
import { getFileName } from "~/shared/lib/getFileName";
import { Button } from "../Button";
import { HelperText } from "../HelperText";
import { RequiredLabelWrapper } from "../RequiredLabelWrapper";
import { Text } from "../Text";
import { FileInput } from "../FileInput";

type Props = {
  open: boolean;
  onClose: () => void;
  create?: (document: Omit<LinkedDocumentInput, "id">) => void;
  update?: (document: LinkedDocumentInput) => void;
  onRemove?: (id: LinkedDocumentInput["id"]) => void;
  document?: LinkedDocument | null;
};

export const DocumentDetailsDialog: React.FC<Props> = ({
  open,
  onClose,
  document,
  onRemove,
  create,
  update
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

  const onSubmit = handleSubmit((newValues) => {
    const input = {
      ...(Boolean(isCreate) && { id: document?.id }),
      ...(Boolean(newValues.file) && { upload: newValues.file }),
      user_name: `${newValues.title}.${newValues.format}`
    };

    if (isCreate) {
      create?.(input);
      return;
    }

    update?.(input);
  });

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
  }, [document, setValue]);

  return (
    <Drawer anchor='right' open={open} onClose={onClose}>
      <Box className='flex flex-col gap-10 p-6' component='form' onSubmitCapture={onSubmit}>
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
          render={({ field: { value } }) => (
            <FileInput
              id='file-input'
              url={value}
              fileName={getValues("title")}
              onFileChange={(file) => {
                setValue("file", file);

                const format = getFileFormat(file?.name ?? "");

                setValue("format", format);
                setValue("title", file?.name ?? "");
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

          <Button
            className='flex-1'
            color='primary'
            type='submit'
            variant='outlined'
            startIcon={<SaveIcon />}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};
