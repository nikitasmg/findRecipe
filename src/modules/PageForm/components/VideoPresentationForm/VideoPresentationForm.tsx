import { Box, FormControl, TextField } from "@mui/material";
import { curry } from "rambda";
import React, { Fragment } from "react";
import { Control, Controller, FieldErrors, UseFormRegister } from "react-hook-form";
import { EnLabelWrapper } from "~/shared/components/EnLabelWrapper";
import { HelperText } from "~/shared/components/HelperText";
import { LinkInput } from "~/shared/components/LinkInput";
import { RequiredLabelWrapper } from "~/shared/components/RequiredLabelWrapper";
import { Text } from "~/shared/components/Text";
import { getEventValueHandler } from "~/shared/lib/events";
import { getErrorMessage } from "~/shared/lib/getError";
import { getBaseUrlValidation } from "~/shared/lib/validation";
import { Languages } from "~/shared/types/Languages";

export type VideoPresentationFields = {
  "params.VideoPresentation.title"?: string;
  "params.VideoPresentation.description"?: string;
  "params.VideoPresentation.title_en"?: string;
  "params.VideoPresentation.description_en"?: string;
  "params.VideoPresentation.link"?: string;
};

type Props = {
  lang: Languages;
  register: UseFormRegister<VideoPresentationFields>;
  errors: FieldErrors<VideoPresentationFields>;
  setValue?: (name: keyof VideoPresentationFields, value: unknown) => void;
  control?: Control<VideoPresentationFields, unknown>;
};

export const VideoPresentationForm: React.FC<Props> = ({
  setValue,
  control,
  lang,
  register,
  errors
}) => {
  if (!setValue) {
    return null;
  }
  const getError = getErrorMessage(errors);

  const isRusLang = lang === "ru";

  const names: {
    title: "params.VideoPresentation.title" | "params.VideoPresentation.title_en";
    description: "params.VideoPresentation.description" | "params.VideoPresentation.description_en";
    link: "params.VideoPresentation.link";
  } = isRusLang
    ? {
        title: "params.VideoPresentation.title",
        description: "params.VideoPresentation.description",
        link: "params.VideoPresentation.link"
      }
    : {
        title: "params.VideoPresentation.title_en",
        description: "params.VideoPresentation.description_en",
        link: "params.VideoPresentation.link"
      };

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

      <Controller
        control={control}
        name={names.description}
        render={({ field: { value } }) => (
          <TextField
            fullWidth
            label={
              <LabelWrapper>
                <Text>Description</Text>
              </LabelWrapper>
            }
            value={value}
            onChange={getEventValueHandler(curry(setValue)(names.description))}
          />
        )}
      />
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
            <HelperText id={names.link} error={getError(names.link)} />
          </FormControl>
        )}
      />
    </Box>
  );
};
