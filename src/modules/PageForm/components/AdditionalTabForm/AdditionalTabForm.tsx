import { Box, FormControl, TextField } from "@mui/material";
import { curry } from "rambda";
import React, { Fragment } from "react";
import { Control, Controller, UseFormRegister } from "react-hook-form";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { useSettingByNameQuery } from "~/generated/graphql";
import { ContentEditor } from "~/shared/components/ContentEditor";
import { EnLabelWrapper } from "~/shared/components/EnLabelWrapper";
import { Text } from "~/shared/components/Text";
import { getEventValueHandler } from "~/shared/lib/events";
import { Languages } from "~/shared/types/Languages";

export type AdditionalTabFields = {
  "params.title"?: string;
  "params.description"?: string;
  "params.title_en"?: string;
  "params.description_en"?: string;
};

type Props = {
  lang: Languages;
  register: UseFormRegister<AdditionalTabFields>;
  setValue?: (name: keyof AdditionalTabFields, value: unknown) => void;
  control?: Control<AdditionalTabFields, unknown>;
};

export const AdditionalTabForm: React.FC<Props> = ({ register, setValue, control, lang }) => {
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

  const isRusLang = lang === "ru";

  const names: {
    title: "params.title" | "params.title_en";
    description: "params.description" | "params.description_en";
  } = isRusLang
    ? {
        title: "params.title",
        description: "params.description"
      }
    : {
        title: "params.title_en",
        description: "params.description_en"
      };

  const contentEditorKey = settingByName?.value;

  const LabelWrapper = isRusLang ? Fragment : EnLabelWrapper;

  return (
    <Box className='flex flex-col gap-6 grow-[2] lg:w-[70%] order-last'>
      <Controller
        control={control}
        name={names.title}
        key={lang.concat(names.title)}
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
          key={lang.concat(names.description)}
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
    </Box>
  );
};
