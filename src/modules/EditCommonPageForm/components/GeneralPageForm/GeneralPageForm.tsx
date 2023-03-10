import { Box, FormControl, TextField } from "@mui/material";
import React, { useCallback } from "react";
import { Control, Controller, FieldErrors, UseFormRegister } from "react-hook-form";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { useSettingByNameQuery, useUploadMutation } from "~/generated/graphql";
import { ContentEditor } from "~/shared/components/ContentEditor";
import { ImageInput } from "~/shared/components/ImageInput";
import { Text } from "~/shared/components/Text";
import { fileFromBlobUrl } from "~/shared/lib/fileFromBlobUrl";

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
};

export const GeneralPageForm: React.FC<Props> = ({ register, control, setValue }) => {
  const client = useGraphqlClient();

  const { data: { settingByName } = {} } = useSettingByNameQuery(client, {
    name: "content_editor"
  });

  const { mutateAsync: upload } = useUploadMutation(client);

  const contentEditorKey = settingByName?.value;

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
                id='name'
                {...register("name")}
              />
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
