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
  "params.Cards_1.Title"?: string;
  "params.Cards_1.Description"?: string;
  "params.Cards_1.Title_en"?: string;
  "params.Cards_1.Description_en"?: string;
  "params.Cards_1.Image"?: string;
  "params.Cards_1.Route"?: string;
  "params.Cards_2.Title"?: string;
  "params.Cards_2.Description"?: string;
  "params.Cards_2.Title_en"?: string;
  "params.Cards_2.Description_en"?: string;
  "params.Cards_2.Image"?: string;
  "params.Cards_2.Route"?: string;
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
    cardOneTitle: "params.Cards_1.Title" | "params.Cards_1.Title_en";
    cardOneDescription: "params.Cards_1.Description" | "params.Cards_1.Description_en";
    cardOneImage: "params.Cards_1.Image";
    cardOneRoute: "params.Cards_1.Route";
    cardTwoTitle: "params.Cards_2.Title" | "params.Cards_2.Title_en";
    cardTwoDescription: "params.Cards_2.Description" | "params.Cards_2.Description_en";
    cardTwoImage: "params.Cards_2.Image";
    cardTwoRoute: "params.Cards_2.Route";
  } = isRusLang
    ? {
        cardOneTitle: "params.Cards_1.Title",
        cardOneDescription: "params.Cards_1.Description",
        cardOneImage: "params.Cards_1.Image",
        cardOneRoute: "params.Cards_1.Route",
        cardTwoTitle: "params.Cards_2.Title",
        cardTwoDescription: "params.Cards_2.Description",
        cardTwoImage: "params.Cards_2.Image",
        cardTwoRoute: "params.Cards_2.Route"
      }
    : {
        cardOneTitle: "params.Cards_1.Title_en",
        cardOneDescription: "params.Cards_1.Description_en",
        cardOneImage: "params.Cards_1.Image",
        cardOneRoute: "params.Cards_1.Route",
        cardTwoTitle: "params.Cards_2.Title_en",
        cardTwoDescription: "params.Cards_2.Description_en",
        cardTwoImage: "params.Cards_2.Image",
        cardTwoRoute: "params.Cards_2.Route"
      };

  const LabelWrapper = isRusLang ? Fragment : EnLabelWrapper;
  const deleteHandlerOne = () => setValue(names.cardOneImage, "");
  const uploadHandlerOne: (file?: File | null) => void = (file) => {
    upload({ file })
      .then((url) => `${process.env.REACT_APP_FILES_URL}${url.upload}`)
      .then((url) => setValue(names.cardOneImage, url));
  };
  const deleteHandlerTwo = () => setValue(names.cardTwoImage, "");
  const uploadHandlerTwo: (file?: File | null) => void = (file) => {
    upload({ file })
      .then((url) => `${process.env.REACT_APP_FILES_URL}${url.upload}`)
      .then((url) => setValue(names.cardTwoImage, url));
  };

  return (
    <Box className='flex flex-col gap-6 grow-[2] lg:w-[70%] order-last'>
      <Controller
        control={control}
        name={names.cardOneImage}
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
        name={names.cardOneTitle}
        render={({ field: { value } }) => (
          <TextField
            fullWidth
            label={
              <LabelWrapper>
                <Text>Title</Text>
              </LabelWrapper>
            }
            value={value}
            onChange={getEventValueHandler(curry(setValue)(names.cardOneTitle))}
          />
        )}
      />
      <Controller
        control={control}
        name={names.cardOneDescription}
        render={({ field: { value } }) => (
          <TextField
            fullWidth
            label={
              <LabelWrapper>
                <Text>Description</Text>
              </LabelWrapper>
            }
            value={value}
            onChange={getEventValueHandler(curry(setValue)(names.cardOneDescription))}
          />
        )}
      />
      <Controller
        control={control}
        name={names.cardOneRoute}
        render={({ field: { value } }) => (
          <TextField
            fullWidth
            label={
              <LabelWrapper>
                <Text>Link</Text>
              </LabelWrapper>
            }
            value={value}
            onChange={getEventValueHandler(curry(setValue)(names.cardOneRoute))}
          />
        )}
      />
      <Controller
        control={control}
        name={names.cardTwoImage}
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
        name={names.cardTwoTitle}
        render={({ field: { value } }) => (
          <TextField
            fullWidth
            label={
              <LabelWrapper>
                <Text>Title</Text>
              </LabelWrapper>
            }
            value={value}
            onChange={getEventValueHandler(curry(setValue)(names.cardTwoTitle))}
          />
        )}
      />
      <Controller
        control={control}
        name={names.cardTwoDescription}
        render={({ field: { value } }) => (
          <TextField
            fullWidth
            label={
              <LabelWrapper>
                <Text>Description</Text>
              </LabelWrapper>
            }
            value={value}
            onChange={getEventValueHandler(curry(setValue)(names.cardTwoDescription))}
          />
        )}
      />
      <Controller
        control={control}
        name={names.cardTwoRoute}
        render={({ field: { value } }) => (
          <TextField
            fullWidth
            label={
              <LabelWrapper>
                <Text>Link</Text>
              </LabelWrapper>
            }
            value={value}
            onChange={getEventValueHandler(curry(setValue)(names.cardTwoRoute))}
          />
        )}
      />
    </Box>
  );
};
