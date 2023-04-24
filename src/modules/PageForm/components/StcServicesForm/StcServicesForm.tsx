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

export type StcServicesFields = {
  "params.StcServices.title"?: string;
  "params.StcServices.description"?: string;
  "params.StcServices.title_en"?: string;
  "params.StcServices.description_en"?: string;
};

type Props = {
  lang: Languages;
  register: UseFormRegister<StcServicesFields>;
  setValue?: (name: keyof StcServicesFields, value: unknown) => void;
  control?: Control<StcServicesFields, unknown>;
};

export const StcServicesForm: React.FC<Props> = ({ register, setValue, control, lang }) => {
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
    title: "params.StcServices.title" | "params.StcServices.title_en";
    description: "params.StcServices.description" | "params.StcServices.description_en";
  } = isRusLang
    ? {
        title: "params.StcServices.title",
        description: "params.StcServices.description"
      }
    : {
        title: "params.StcServices.title_en",
        description: "params.StcServices.description_en"
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
    </Box>
  );
};
