import { Box, FormControl, TextField } from "@mui/material";
import { curry } from "rambda";
import React, { Fragment } from "react";
import { Control, Controller, FieldErrors, UseFormRegister } from "react-hook-form";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { useSettingByNameQuery } from "~/generated/graphql";
import { ContentEditor } from "~/shared/components/ContentEditor";
import { EnLabelWrapper } from "~/shared/components/EnLabelWrapper";
import { HelperText } from "~/shared/components/HelperText";
import { LinkInput } from "~/shared/components/LinkInput";
import { RequiredLabelWrapper } from "~/shared/components/RequiredLabelWrapper";
import { Text } from "~/shared/components/Text";
import { getEventValueHandler } from "~/shared/lib/events";
import { getErrorMessage } from "~/shared/lib/getError";
import { getBaseUrlValidation } from "~/shared/lib/validation";
import { Languages } from "~/shared/types/Languages";

export type StcTechnologiesFields = {
  "params.StcTechnologies.title"?: string;
  "params.StcTechnologies.description"?: string;
  "params.StcTechnologies.title_en"?: string;
  "params.StcTechnologies.description_en"?: string;
  "params.StcTechnologies.link"?: string;
};

type Props = {
  lang: Languages;
  register: UseFormRegister<StcTechnologiesFields>;
  errors: FieldErrors<StcTechnologiesFields>;
  setValue?: (name: keyof StcTechnologiesFields, value: unknown) => void;
  control?: Control<StcTechnologiesFields, unknown>;
};

export const StcTechnologiesForm: React.FC<Props> = ({
  errors,
  register,
  setValue,
  control,
  lang
}) => {
  const client = useGraphqlClient();

  const { data: { settingByName } = {} } = useSettingByNameQuery(
    client,
    {
      name: "content_editor"
    },
    { refetchOnMount: "always" }
  );

  if (!setValue) {
    return null;
  }
  const getError = getErrorMessage(errors);
  const isRusLang = lang === "ru";

  const names: {
    title: "params.StcTechnologies.title" | "params.StcTechnologies.title_en";
    description: "params.StcTechnologies.description" | "params.StcTechnologies.description_en";
    link: "params.StcTechnologies.link";
  } = isRusLang
    ? {
        title: "params.StcTechnologies.title",
        description: "params.StcTechnologies.description",
        link: "params.StcTechnologies.link"
      }
    : {
        title: "params.StcTechnologies.title_en",
        description: "params.StcTechnologies.description_en",
        link: "params.StcTechnologies.link"
      };

  const contentEditorKey = settingByName?.value;

  const LabelWrapper = isRusLang ? Fragment : EnLabelWrapper;
  return (
    <Box className='flex flex-col gap-6 grow-[2] lg:w-[70%] order-last'>
      <Controller
        control={control}
        name={names.title}
        render={({ field: { value } }) => (
          <TextField
            fullWidth
            label={
              <LabelWrapper>
                <Text>Title</Text>
              </LabelWrapper>
            }
            value={value}
            onChange={getEventValueHandler(curry(setValue)(names.title))}
          />
        )}
      />

      {contentEditorKey && (
        <Controller
          control={control}
          name={names.description}
          render={({ field: { value } }) => (
            <FormControl fullWidth>
              <ContentEditor
                apiKey={contentEditorKey}
                value={value ?? ""}
                {...register(names.description)}
                onChange={getEventValueHandler(curry(setValue)(names.description))}
              />
            </FormControl>
          )}
        />
      )}

      <Controller
        control={control}
        name={names.link}
        render={({ field: { value } }) => (
          <FormControl fullWidth>
            <LinkInput
              label={
                <RequiredLabelWrapper>
                  <Text>Link</Text>
                </RequiredLabelWrapper>
              }
              value={value}
              type={names.link}
              error={!!getError(names.link)}
              {...register(names.link, getBaseUrlValidation({ required: true }))}
              onChange={getEventValueHandler(curry(setValue)(names.link))}
            />
            <HelperText id='url' error={getError("url")} />
          </FormControl>
        )}
      />
    </Box>
  );
};
