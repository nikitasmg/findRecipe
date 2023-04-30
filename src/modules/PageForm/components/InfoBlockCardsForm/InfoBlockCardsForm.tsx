import { Box, TextField } from "@mui/material";
import { curry } from "rambda";
import React, { Fragment } from "react";
import { Control, Controller, UseFormRegister } from "react-hook-form";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { useUploadMutation } from "~/generated/graphql";

import { EnLabelWrapper } from "~/shared/components/EnLabelWrapper";
import { ImageInput } from "~/shared/components/ImageInput";
import { Text } from "~/shared/components/Text";
import { getEventValueHandler } from "~/shared/lib/events";
import { useAlertsStore } from "~/shared/stores/alerts";
import { Languages } from "~/shared/types/Languages";

export type InfoBlockCardsFields = {
  "params.BlockOneTitle"?: string;
  "params.BlockOneDescription"?: string;
  "params.BlockOneTitle_en"?: string;
  "params.BlockOneDescription_en"?: string;
  "params.blockOneImage"?: string;
  "params.blockOneRoute"?: string;
  "params.BlockTwoTitle"?: string;
  "params.BlockTwoDescription"?: string;
  "params.BlockTwoTitle_en"?: string;
  "params.BlockTwoDescription_en"?: string;
  "params.blockTwoImage"?: string;
  "params.blockTwoRoute"?: string;
};

type Props = {
  lang: Languages;
  register?: UseFormRegister<InfoBlockCardsFields>;
  setValue?: (name: keyof InfoBlockCardsFields, value: unknown) => void;
  control?: Control<InfoBlockCardsFields, unknown>;
};

export const InfoBlockCardsForm: React.FC<Props> = ({ setValue, control, lang }) => {
  const addAlert = useAlertsStore((state) => state.addAlert);
  const client = useGraphqlClient();
  const { mutateAsync: upload } = useUploadMutation(client);
  if (!setValue) {
    return null;
  }

  const isRusLang = lang === "ru";

  const names: {
    blockOneTitle: "params.BlockOneTitle" | "params.BlockOneTitle_en";
    blockOneDescription: "params.BlockOneDescription" | "params.BlockOneDescription_en";
    blockOneImage: "params.blockOneImage";
    blockOneRoute: "params.blockOneRoute";
    blockTwoTitle: "params.BlockTwoTitle" | "params.BlockTwoTitle_en";
    blockTwoDescription: "params.BlockTwoDescription" | "params.BlockTwoDescription_en";
    blockTwoImage: "params.blockTwoImage";
    blockTwoRoute: "params.blockTwoRoute";
  } = isRusLang
    ? {
        blockOneTitle: "params.BlockOneTitle",
        blockOneDescription: "params.BlockOneDescription",
        blockOneImage: "params.blockOneImage",
        blockOneRoute: "params.blockOneRoute",
        blockTwoTitle: "params.BlockTwoTitle",
        blockTwoDescription: "params.BlockTwoDescription",
        blockTwoImage: "params.blockTwoImage",
        blockTwoRoute: "params.blockTwoRoute"
      }
    : {
        blockOneTitle: "params.BlockOneTitle_en",
        blockOneDescription: "params.BlockOneDescription_en",
        blockOneImage: "params.blockOneImage",
        blockOneRoute: "params.blockOneRoute",
        blockTwoTitle: "params.BlockTwoTitle_en",
        blockTwoDescription: "params.BlockTwoDescription_en",
        blockTwoImage: "params.blockTwoImage",
        blockTwoRoute: "params.blockTwoRoute"
      };

  const LabelWrapper = isRusLang ? Fragment : EnLabelWrapper;
  const deleteHandlerOne = () => setValue(names.blockOneImage, "");
  const uploadHandlerOne: (file?: File | null) => void = (file) => {
    upload({ file })
      .then((url) => `${process.env.REACT_APP_FILES_URL}${url.upload}`)
      .then((url) => setValue(names.blockOneImage, url));
  };
  const deleteHandlerTwo = () => setValue(names.blockTwoImage, "");
  const uploadHandlerTwo: (file?: File | null) => void = (file) => {
    upload({ file })
      .then((url) => `${process.env.REACT_APP_FILES_URL}${url.upload}`)
      .then((url) => setValue(names.blockTwoImage, url));
  };

  return (
    <Box className='flex flex-col gap-6 grow-[2] lg:w-[70%] order-last'>
      <Controller
        control={control}
        name={names.blockOneImage}
        render={({ field: { value } }) => (
          <ImageInput
            addAlert={addAlert}
            id='file-input'
            url={value ?? ""}
            onChange={(file) => {
              uploadHandlerOne(file as File);
            }}
            onDelete={deleteHandlerOne}
          />
        )}
      />
      <Controller
        control={control}
        name={names.blockOneTitle}
        render={({ field: { value } }) => (
          <TextField
            fullWidth
            label={
              <LabelWrapper>
                <Text>Title</Text>
              </LabelWrapper>
            }
            value={value}
            onChange={getEventValueHandler(curry(setValue)(names.blockOneTitle))}
          />
        )}
      />
      <Controller
        control={control}
        name={names.blockOneDescription}
        render={({ field: { value } }) => (
          <TextField
            fullWidth
            label={
              <LabelWrapper>
                <Text>Description</Text>
              </LabelWrapper>
            }
            value={value}
            onChange={getEventValueHandler(curry(setValue)(names.blockOneDescription))}
          />
        )}
      />
      <Controller
        control={control}
        name={names.blockOneRoute}
        render={({ field: { value } }) => (
          <TextField
            fullWidth
            label={
              <LabelWrapper>
                <Text>Link</Text>
              </LabelWrapper>
            }
            value={value}
            onChange={getEventValueHandler(curry(setValue)(names.blockOneRoute))}
          />
        )}
      />
      <Controller
        control={control}
        name={names.blockTwoImage}
        render={({ field: { value } }) => (
          <ImageInput
            addAlert={addAlert}
            id='file-input'
            url={value ?? ""}
            onChange={(file) => {
              uploadHandlerTwo(file as File);
            }}
            onDelete={deleteHandlerTwo}
          />
        )}
      />
      <Controller
        control={control}
        name={names.blockTwoTitle}
        render={({ field: { value } }) => (
          <TextField
            fullWidth
            label={
              <LabelWrapper>
                <Text>Title</Text>
              </LabelWrapper>
            }
            value={value}
            onChange={getEventValueHandler(curry(setValue)(names.blockTwoTitle))}
          />
        )}
      />
      <Controller
        control={control}
        name={names.blockTwoDescription}
        render={({ field: { value } }) => (
          <TextField
            fullWidth
            label={
              <LabelWrapper>
                <Text>Description</Text>
              </LabelWrapper>
            }
            value={value}
            onChange={getEventValueHandler(curry(setValue)(names.blockTwoDescription))}
          />
        )}
      />
      <Controller
        control={control}
        name={names.blockTwoRoute}
        render={({ field: { value } }) => (
          <TextField
            fullWidth
            label={
              <LabelWrapper>
                <Text>Link</Text>
              </LabelWrapper>
            }
            value={value}
            onChange={getEventValueHandler(curry(setValue)(names.blockTwoRoute))}
          />
        )}
      />
    </Box>
  );
};
