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

export type AboutProjectFields = {
  "params.aboutProject.title"?: string;
  "params.aboutProject.description"?: string;
  "params.aboutProject.title_en"?: string;
  "params.aboutProject.description_en"?: string;
};

type Props = {
  lang: Languages;
  register: UseFormRegister<AboutProjectFields>;
  setValue?: (name: keyof AboutProjectFields, value: unknown) => void;
  control?: Control<AboutProjectFields, unknown>;
};

export const AboutProjectForm: React.FC<Props> = ({ register, setValue, control, lang }) => {
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
    title: "params.aboutProject.title" | "params.aboutProject.title_en";
    description: "params.aboutProject.description" | "params.aboutProject.description_en";
  } = isRusLang
    ? {
        title: "params.aboutProject.title",
        description: "params.aboutProject.description"
      }
    : {
        title: "params.aboutProject.title_en",
        description: "params.aboutProject.description_en"
      };

  const contentEditorKey = settingByName?.value;

  const LabelWrapper = isRusLang ? Fragment : EnLabelWrapper;

  return (
    <Box className='flex flex-col gap-10 grow-[2] lg:w-[70%] order-last'>
      <Controller
        control={control}
        key={lang.concat(names.title)}
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
          key={lang.concat(names.description)}
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
    </Box>
  );
};
