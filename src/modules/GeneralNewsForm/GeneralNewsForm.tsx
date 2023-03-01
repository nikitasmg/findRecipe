import { Box, FormControl, TextField } from "@mui/material";
import React, { useCallback } from "react";
import { Control, Controller, FieldErrors, UseFormRegister } from "react-hook-form";
import { ContentEditor } from "~shared/components/ContentEditor";
import { HelperText } from "~/shared/components/HelperText";
import { ImageInput } from "~/shared/components/ImageInput";
import { Text } from "~/shared/components/Text";
import { getErrorMessage } from "~/shared/lib/getError";
import { useUploadMutation } from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { fileFromBlobUrl } from "~/shared/lib/fileFromBlobUrl";

type FormFields = {
  name?: string;
  description?: string;
  content?: string;
  imageUrl?: string;
};

type Props = {
  register: UseFormRegister<Partial<FormFields>>;
  errors: FieldErrors<FormFields>;
  setValue: (name: string, value: unknown) => void;
  control?: Control<FormFields, unknown>;
};

export const GeneralNewsForm: React.FC<Props> = ({ register, setValue, errors, control }) => {
  const getError = getErrorMessage(errors);

  const client = useGraphqlClient();

  const { mutateAsync: upload } = useUploadMutation(client);

  const getUploadedUrl = useCallback(
    (url: string) => {
      return fileFromBlobUrl(url).then((file) =>
        upload({ file }).then((url) => `${process.env.REACT_APP_FILES_URL}${url.upload}`)
      );
    },
    [upload]
  );

  return (
    <Box className='flex flex-col lg:flex-row gap-6'>
      <Box className='grow-[2] lg:w-[70%] order-last mt-2'>
        <Controller
          control={control}
          name='name'
          render={({ field: { value } }) => (
            <FormControl fullWidth className='!p-2'>
              <TextField
                label={<Text>Title</Text>}
                value={value}
                variant='standard'
                InputLabelProps={{
                  shrink: !!value
                }}
                id='name'
                error={!!getError("name")}
                {...register("name", { required: "This is required" })}
              />

              <HelperText id='name' error={getError("name")} />
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name='description'
          render={({ field: { value } }) => (
            <FormControl fullWidth className='!p-2 !mt-4'>
              <TextField
                label={<Text>Description</Text>}
                value={value}
                variant='standard'
                id='description'
                error={!!getError("description")}
                {...register("description")}
              />
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name='content'
          render={({ field: { value } }) => (
            <FormControl fullWidth className='!p-2 !mt-4'>
              <ContentEditor
                value={value ?? ""}
                {...register("content")}
                getUploadedUrl={getUploadedUrl}
              />
            </FormControl>
          )}
        />

        <FormControl fullWidth className='!p-2 !mt-4'></FormControl>
      </Box>

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
    </Box>
  );
};
