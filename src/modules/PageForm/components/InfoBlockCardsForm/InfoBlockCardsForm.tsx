import { Box, TextField } from "@mui/material";
import { curry } from "rambda";
import React, { Fragment } from "react";
import { Control, Controller, UseFormRegister } from "react-hook-form";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { useUploadMutation } from "~/generated/graphql";
import {
  CARDS_ONE_DESCRIPTION,
  CARDS_ONE_DESCRIPTION_EN,
  CARDS_ONE_IMAGE,
  CARDS_ONE_ROUTE,
  CARDS_ONE_TITLE,
  CARDS_ONE_TITLE_EN,
  CARDS_TWO_DESCRIPTION,
  CARDS_TWO_DESCRIPTION_EN,
  CARDS_TWO_IMAGE,
  CARDS_TWO_ROUTE,
  CARDS_TWO_TITLE,
  CARDS_TWO_TITLE_EN
} from "./constants";
import { EnLabelWrapper } from "~/shared/components/EnLabelWrapper";
import { ImageInput } from "~/shared/components/ImageInput";
import { Text } from "~/shared/components/Text";
import { getEventValueHandler } from "~/shared/lib/events";
import { useAlertsStore } from "~/shared/stores/alerts";
import { Languages } from "~/shared/types/Languages";
import { InfoBlockCardsFields, NamesInfoBlock } from "./types";

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

  const names: NamesInfoBlock = isRusLang
    ? {
        cardOneTitle: CARDS_ONE_TITLE,
        cardOneDescription: CARDS_ONE_DESCRIPTION,
        cardOneImage: CARDS_ONE_IMAGE,
        cardOneRoute: CARDS_ONE_ROUTE,
        cardTwoTitle: CARDS_TWO_TITLE,
        cardTwoDescription: CARDS_TWO_DESCRIPTION,
        cardTwoImage: CARDS_TWO_IMAGE,
        cardTwoRoute: CARDS_TWO_ROUTE
      }
    : {
        cardOneTitle: CARDS_ONE_TITLE_EN,
        cardOneDescription: CARDS_ONE_DESCRIPTION_EN,
        cardOneImage: CARDS_ONE_IMAGE,
        cardOneRoute: CARDS_ONE_ROUTE,
        cardTwoTitle: CARDS_TWO_TITLE_EN,
        cardTwoDescription: CARDS_TWO_DESCRIPTION_EN,
        cardTwoImage: CARDS_TWO_IMAGE,
        cardTwoRoute: CARDS_TWO_ROUTE
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
        key={lang.concat(names.cardOneTitle)}
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
        key={lang.concat(names.cardOneDescription)}
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
        key={lang.concat(names.cardTwoTitle)}
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
        key={lang.concat(names.cardTwoDescription)}
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
