import { Box, Drawer, FormControl, TextField } from "@mui/material";
import React from "react";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import { Controller, useForm } from "react-hook-form";
import { LinkedDocument, LinkedDocumentInput } from "~/generated/graphql";
import { getErrorMessage } from "~/shared/lib/getError";
import { baseRequired } from "~/shared/lib/validation";
import { getFileFormat } from "~/shared/lib/getFileFormat";
import { Button } from "../Button";
import { HelperText } from "../HelperText";
import { RequiredLabelWrapper } from "../RequiredLabelWrapper";
import { Text } from "../Text";
import { FileInput } from "../FileInput";

type Props = {
  open: boolean;
  onClose: () => void;
  create?: (document: Omit<LinkedDocumentInput, "id">) => Promise<void>;
  update?: (document: LinkedDocumentInput) => Promise<void>;
  onRemove?: (id: LinkedDocumentInput["id"]) => void;
  document?: LinkedDocument | null;
};

export const DocumentDetailsDialog: React.FC<Props> = ({ open, onClose, document, onRemove }) => {
  const {
    register,
    control,
    setValue,
    formState: { errors },
    handleSubmit,
    getValues
  } = useForm({ mode: "all" });

  const getError = getErrorMessage(errors);

  const onSubmit = handleSubmit((newValues) => {
    console.log(newValues);
  });

  const handleDelete = () => {
    if (document?.id) {
      onRemove?.(document.id);
    }

    onClose();
  };

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
              }}
            />
          )}
        />

        <Box className='flex gap-2'>
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
