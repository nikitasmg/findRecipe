import {
  Box,
  FormControl,
  FormControlLabel,
  Switch,
  TextareaAutosize,
  TextField
} from "@mui/material";
import React, { useCallback } from "react";
import clsx from "clsx";
import { Control, Controller, FieldErrors, UseFormRegister } from "react-hook-form";
import { useSettingByNameQuery, useUploadMutation } from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { ContentEditor } from "~shared/components/ContentEditor";
import { HelperText } from "~/shared/components/HelperText";
import { ImageInput } from "~/shared/components/ImageInput";
import { Text } from "~/shared/components/Text";
import { RequiredLabelWrapper } from "~/shared/components/RequiredLabelWrapper";
import { EnLabelWrapper } from "~/shared/components/EnLabelWrapper";
import { getErrorMessage } from "~/shared/lib/getError";
import { fileFromBlobUrl } from "~/shared/lib/fileFromBlobUrl";
import { baseRequired } from "~/shared/lib/validation";
import { getEventValueHandler } from "~/shared/lib/events";
import { useAlertsStore } from "~/shared/stores/alerts";
import { Languages } from "~/shared/types/Languages";
import { curry } from "rambda";
import { getCheckedHandler } from "~shared/lib/getCheckedHandler";

type FormFields = {
  name?: string;
  name_en?: string;
  description?: string;
  description_en?: string;
  content?: string;
  content_en?: string;
  imageUrl?: string;
  image_description?: string;
  image_description_en?: string;
  published?: boolean;
  on_index?: boolean;
};

type Props = {
  register: UseFormRegister<Partial<FormFields>>;
  errors: FieldErrors<FormFields>;
  setValue: (name: string, value: unknown) => void;
  lang: Languages;
  control?: Control<FormFields, unknown>;
};

export const GeneralNewsForm: React.FC<Props> = ({ register, setValue, errors, control, lang }) => {
  const getError = getErrorMessage(errors);

  const client = useGraphqlClient();

  const { mutateAsync: upload } = useUploadMutation(client);

  const { data } = useSettingByNameQuery(
    client,
    { name: "content_editor" },
    { refetchOnMount: "always" }
  );

  const handleChecked = getCheckedHandler(setValue);

  const contentEditorKey = data?.settingByName?.value;

  const getUploadedUrl = useCallback(
    (url: string) => {
      return fileFromBlobUrl(url).then((file) =>
        upload({ file }).then((url) => `${process.env.REACT_APP_FILES_URL}${url.upload}`)
      );
    },
    [upload]
  );

  const addAlert = useAlertsStore((state) => state.addAlert);

  const isRuLang = lang === "ru";

  return (
    <Box className='flex flex-col lg:flex-row gap-10'>
      <Box className='flex flex-col gap-10 grow-[2] lg:w-[70%] order-last'>
        <Box className='flex gap-16'>
          <Controller
            control={control}
            name='on_index'
            render={({ field: { value } }) => (
              <FormControlLabel
                control={<Switch checked={!!value} onChange={handleChecked("on_index")} />}
                label={<Text>Visible on home page</Text>}
              />
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
        </Box>

        {isRuLang && (
          <Controller
            control={control}
            name='name'
            render={({ field: { value } }) => (
              <FormControl fullWidth>
                <TextField
                  label={
                    <RequiredLabelWrapper>
                      <Text>Heading</Text>
                    </RequiredLabelWrapper>
                  }
                  value={value ?? ""}
                  error={!!getError("name")}
                  {...register("name", {
                    ...baseRequired,
                    maxLength: { value: 500, message: "Max length text field 500" }
                  })}
                />

                <HelperText id='name' error={getError("name")} />
              </FormControl>
            )}
          />
        )}

        {!isRuLang && (
          <Controller
            control={control}
            name='name_en'
            render={({ field: { value } }) => (
              <FormControl fullWidth>
                <TextField
                  label={
                    <EnLabelWrapper>
                      <Text>Heading</Text>
                    </EnLabelWrapper>
                  }
                  value={value ?? ""}
                  error={!!getError("name_en")}
                  {...register("name_en", {
                    maxLength: { value: 500, message: "Max length text field 500" }
                  })}
                />

                <HelperText id='name_en' error={getError("name_en")} />
              </FormControl>
            )}
          />
        )}

        {isRuLang && (
          <Controller
            control={control}
            name='description'
            render={({ field: { value } }) => (
              <FormControl fullWidth>
                <TextField
                  label={<Text>News announcement</Text>}
                  value={value ?? ""}
                  multiline
                  fullWidth
                  error={!!getError("description")}
                  InputProps={{
                    inputComponent: TextareaAutosize
                  }}
                  {...register("description")}
                />
                <HelperText id='description' error={getError("description")} />
              </FormControl>
            )}
          />
        )}

        {!isRuLang && (
          <Controller
            control={control}
            name='description_en'
            render={({ field }) => (
              <TextField
                label={
                  <EnLabelWrapper>
                    <Text>News announcement</Text>
                  </EnLabelWrapper>
                }
                {...field}
                fullWidth
                error={!!getError("description_en")}
                InputProps={{
                  inputComponent: TextareaAutosize
                }}
              />
            )}
          />
        )}

        {isRuLang && (
          <Controller
            control={control}
            name='image_description'
            render={({ field: { value } }) => (
              <FormControl fullWidth>
                <TextField
                  label={<Text>Image caption</Text>}
                  value={value ?? ""}
                  multiline
                  fullWidth
                  error={!!getError("image_description")}
                  InputProps={{
                    inputComponent: TextareaAutosize
                  }}
                  {...register("image_description")}
                />
                <HelperText id='image_description' error={getError("image_description")} />
              </FormControl>
            )}
          />
        )}

        {!isRuLang && (
          <Controller
            control={control}
            name='image_description_en'
            render={({ field }) => (
              <TextField
                label={
                  <EnLabelWrapper>
                    <Text>Image caption</Text>
                  </EnLabelWrapper>
                }
                {...field}
                fullWidth
                error={!!getError("image_description_en")}
                InputProps={{
                  inputComponent: TextareaAutosize
                }}
              />
            )}
          />
        )}

        {contentEditorKey && isRuLang && (
          <Controller
            control={control}
            name='content'
            render={({ field: { value } }) => (
              <FormControl error={!!getError("content")} fullWidth>
                <RequiredLabelWrapper>
                  <Text
                    className={clsx("text-base font-medium mb-2", {
                      "text-mainError": !!getError("content")
                    })}
                  >
                    Description
                  </Text>
                </RequiredLabelWrapper>
                <ContentEditor
                  error={!!getError("content")}
                  apiKey={contentEditorKey}
                  value={value ?? ""}
                  {...register("content", baseRequired)}
                  onChange={getEventValueHandler(curry(setValue)("content"))}
                  getUploadedUrl={getUploadedUrl}
                />

                <HelperText id='content' error={getError("content")} />
              </FormControl>
            )}
          />
        )}

        {contentEditorKey && !isRuLang && (
          <Controller
            control={control}
            name='content_en'
            render={({ field: { value, onChange } }) => (
              <FormControl fullWidth>
                <EnLabelWrapper>
                  <Text className='text-base font-medium mb-2'>Description</Text>
                </EnLabelWrapper>
                <ContentEditor
                  name='content_en'
                  apiKey={contentEditorKey}
                  value={value ?? ""}
                  onChange={onChange}
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
              addAlert={addAlert}
              url={value}
              {...register("imageUrl")}
              onChange={(file) => {
                setValue("uploadImage", file);
              }}
              onDelete={() => {
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
