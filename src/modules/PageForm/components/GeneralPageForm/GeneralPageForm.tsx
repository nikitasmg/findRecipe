import { Box, FormControl, TextField } from "@mui/material";
import { curry } from "rambda";
import React, { useCallback } from "react";
import { Control, Controller, FieldErrors, UseFormRegister } from "react-hook-form";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { useSettingByNameQuery, useUploadMutation } from "~/generated/graphql";
import { ContentEditor } from "~/shared/components/ContentEditor";
import { EnLabelWrapper } from "~/shared/components/EnLabelWrapper";
import { HelperText } from "~/shared/components/HelperText";
import { ImageInput } from "~/shared/components/ImageInput";
import { RequiredLabelWrapper } from "~/shared/components/RequiredLabelWrapper";
import { Text } from "~/shared/components/Text";
import { getEventValueHandler } from "~/shared/lib/events";
import { fileFromBlobUrl } from "~/shared/lib/fileFromBlobUrl";
import { getErrorMessage } from "~/shared/lib/getError";
import { baseRequiredTextValidation } from "~/shared/lib/validation";
import { useAlertsStore } from "~/shared/stores/alerts";
import { Languages } from "~/shared/types/Languages";

export type GeneralFormFields = {
  name?: string;
  description?: string;
  name_en?: string;
  description_en?: string;
  imageUrl?: string;
};

type Props = {
  lang: Languages;
  register: UseFormRegister<Partial<GeneralFormFields>>;
  errors: FieldErrors<GeneralFormFields>;
  setValue: (name: string, value: unknown) => void;
  control?: Control<GeneralFormFields, unknown>;
};

export const GeneralPageForm: React.FC<Props> = ({ register, control, setValue, errors, lang }) => {
  const client = useGraphqlClient();

  const { data: { settingByName } = {} } = useSettingByNameQuery(
    client,
    {
      name: "content_editor"
    },
    { refetchOnMount: "always" }
  );

  const isRusLang = lang === "ru";

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

  const addAlert = useAlertsStore((state) => state.addAlert);

  const getError = getErrorMessage(errors);

  return (
    <Box className='flex flex-col lg:flex-row gap-10'>
      <Box className='flex flex-col gap-10 grow-[2] lg:w-[70%] order-last'>
        {isRusLang && (
          <Controller
            control={control}
            name='name'
            render={({ field: { value } }) => (
              <FormControl fullWidth>
                <TextField
                  error={getError("name")}
                  label={
                    <RequiredLabelWrapper>
                      <Text>Title</Text>
                    </RequiredLabelWrapper>
                  }
                  value={value ?? ""}
                  variant='outlined'
                  id='name'
                  {...register("name", baseRequiredTextValidation)}
                />

                <HelperText id='name' error={getError("name")} />
              </FormControl>
            )}
          />
        )}

        {!isRusLang && (
          <Controller
            control={control}
            name='name_en'
            render={({ field: { value } }) => (
              <FormControl fullWidth>
                <TextField
                  label={
                    <EnLabelWrapper>
                      <Text>Title</Text>
                    </EnLabelWrapper>
                  }
                  value={value ?? ""}
                  variant='outlined'
                  {...register("name_en")}
                />
              </FormControl>
            )}
          />
        )}

        {contentEditorKey && isRusLang && (
          <Controller
            control={control}
            name='description'
            render={({ field: { value } }) => (
              <FormControl fullWidth>
                <ContentEditor
                  apiKey={contentEditorKey}
                  value={value ?? ""}
                  {...register("description")}
                  onChange={getEventValueHandler(curry(setValue)("description"))}
                  getUploadedUrl={getUploadedUrl}
                />
              </FormControl>
            )}
          />
        )}

        {contentEditorKey && !isRusLang && (
          <Controller
            control={control}
            name='description_en'
            render={({ field: { value } }) => (
              <FormControl fullWidth>
                <ContentEditor
                  apiKey={contentEditorKey}
                  value={value ?? ""}
                  {...register("description_en")}
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
              addAlert={addAlert}
              id='general'
              url={value}
              {...register("imageUrl")}
              onChange={(file) => {
                setValue("uploadImage", file);
              }}
              onDelete={() => {
                setValue("uploadImage", null);
                setValue("deleteImage", true);
                setValue("imageUrl", null);
              }}
            />
          )}
        />
      </Box>
    </Box>
  );
};
