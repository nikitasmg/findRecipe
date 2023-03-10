import { Box, FormControl, TextareaAutosize, TextField } from "@mui/material";
import React, { useCallback } from "react";
import { Control, Controller, FieldErrors, UseFormRegister } from "react-hook-form";
import { fileFromBlobUrl } from "~/shared/lib/fileFromBlobUrl";
import { getErrorMessage } from "~/shared/lib/getError";
import { baseRequired } from "~/shared/lib/validation";
import { ContentEditor } from "../ContentEditor";
import { HelperText } from "../HelperText";
import { ImageInput } from "../ImageInput";
import { Text } from "../Text";

export type GeneralFormFields = {
  name?: string;
  description?: string;
  imageUrl?: string;
};

type Props = {
  register: UseFormRegister<Partial<GeneralFormFields>>;
  errors: FieldErrors<GeneralFormFields>;
  setValue: (name: string, value: unknown) => void;
  control?: Control<GeneralFormFields, unknown>;
  options?: {
    isImageExist?: boolean;
  };
  contentEditorKey?: string;
  upload?: (value: { file: Blob }) => Promise<{ upload: string }>;
};

export const GeneralBasePageForm: React.FC<Props> = ({
  register,
  errors,
  setValue,
  control,
  options,
  contentEditorKey,
  upload
}) => {
  const getUploadedUrl = useCallback(
    (url: string) => {
      return fileFromBlobUrl(url).then(
        (file) =>
          upload?.({ file }).then((url) => `${process.env.REACT_APP_FILES_URL}${url.upload}`) ?? url
      );
    },
    [upload]
  );

  const getError = getErrorMessage(errors);

  return (
    <Box className='flex flex-col lg:flex-row gap-6'>
      <Box className='flex flex-col gap-6 grow-[2] lg:w-[70%] order-last'>
        <Controller
          control={control}
          name='name'
          render={({ field: { value } }) => (
            <FormControl fullWidth>
              <TextField
                label={<Text>Title</Text>}
                value={value}
                variant='outlined'
                {...register("name", baseRequired)}
              />

              <HelperText id='name' error={getError("name")} />
            </FormControl>
          )}
        />

        {contentEditorKey && (
          <Controller
            control={control}
            name='description'
            render={({ field: { value } }) => (
              <FormControl fullWidth>
                <ContentEditor
                  apiKey={contentEditorKey}
                  value={value ?? ""}
                  {...register("description")}
                  getUploadedUrl={getUploadedUrl}
                />
              </FormControl>
            )}
          />
        )}

        {!contentEditorKey && (
          <Controller
            control={control}
            name='description'
            render={({ field: { value } }) => (
              <TextField
                id='description'
                multiline
                fullWidth
                value={value}
                label={<Text>Description</Text>}
                InputProps={{
                  inputComponent: TextareaAutosize
                }}
                {...register("description")}
              />
            )}
          />
        )}
      </Box>

      {options?.isImageExist && (
        <Box className='grow-[1] flex justify-center lg:w-[30%] order-first lg:order-last'>
          <Controller
            control={control}
            name='imageUrl'
            render={({ field: { value } }) => (
              <ImageInput
                id='general'
                url={value}
                {...register("imageUrl")}
                onChange={(file) => {
                  setValue("uploadImage", file);
                }}
                onDelete={() => {
                  setValue("uploadImage", null);
                  setValue("imageUrl", null);
                }}
              />
            )}
          />
        </Box>
      )}
    </Box>
  );
};
