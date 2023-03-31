import { FormControl, FormLabel, TextField } from "@mui/material";
import { curry } from "rambda";
import React, { Fragment } from "react";
import { Control, Controller, FieldErrors, UseFormGetValues } from "react-hook-form";
import { GalleryImage, UpdateGalleryInput, UploadGalleryInput } from "~/generated/graphql";
import { EnLabelWrapper } from "~/shared/components/EnLabelWrapper";
import { GalleryInput } from "~/shared/components/GalleryInput";
import { HelperText } from "~/shared/components/HelperText";
import { Text } from "~/shared/components/Text";
import { getEventValueHandler } from "~/shared/lib/events";
import { fileFromBlobUrl } from "~/shared/lib/fileFromBlobUrl";
import { getErrorMessage } from "~/shared/lib/getError";
import { Languages } from "~/shared/types/Languages";

export type BannerFields = {
  gallery?: GalleryImage[];
  uploadGalleryImages?: UploadGalleryInput[];
  deleteGalleryImages?: number[];
  updateGallery?: UpdateGalleryInput[];
  "params.banner.title"?: string;
  "params.banner.description"?: string;
  "params.banner.title_en"?: string;
  "params.banner.description_en"?: string;
};

type Props = {
  lang: Languages;
  errors?: FieldErrors<BannerFields>;
  setValue?: (name: keyof BannerFields, value: unknown) => void;
  getValues?: UseFormGetValues<BannerFields>;
  control?: Control<BannerFields, unknown>;
};

export const Banner: React.FC<Props> = ({ errors, setValue, getValues, control, lang }) => {
  if (!setValue) {
    return null;
  }

  const getError = getErrorMessage(errors ?? {});

  const handleUpload = async (images: Partial<GalleryImage>[]) => {
    const current = getValues?.("uploadGalleryImages");

    const newFiles: Promise<UploadGalleryInput[]> = Promise.all(
      (images ?? [])?.map(async (image: Partial<GalleryImage> & { file?: File }) => ({
        upload: image.file || (image.url ? await fileFromBlobUrl(image.url) : ""),
        sort: image.sort,
        alt: image.alt
      }))
    );

    newFiles.then((files) => {
      setValue?.("uploadGalleryImages", (current ?? []).concat(files));
    });
  };

  const handleDelete = (image: GalleryImage) => {
    const current = getValues?.("deleteGalleryImages");
    setValue?.("deleteGalleryImages", (current ?? []).concat(image.id));
  };

  const handleUpdate = (images: GalleryImage) => {
    const current = getValues?.("updateGallery");
    setValue?.("updateGallery", (current ?? []).concat(images));
  };

  const isRusLang = lang === "ru";

  const names: {
    name: "params.banner.title" | "params.banner.title_en";
    description: "params.banner.description" | "params.banner.description_en";
  } = isRusLang
    ? { name: "params.banner.title", description: "params.banner.description" }
    : { name: "params.banner.title_en", description: "params.banner.description_en" };

  const LabelWrapper = isRusLang ? Fragment : EnLabelWrapper;

  return (
    <>
      <FormControl fullWidth>
        <FormLabel>
          <Text component='span'>Banners</Text>
        </FormLabel>
        <Controller
          control={control}
          name='gallery'
          render={({ field: { value, onChange } }) => (
            <GalleryInput
              onUpload={handleUpload}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
              initialValue={value}
              onChange={onChange}
            />
          )}
        />

        <HelperText id='gallery' error={getError("gallery")} />
      </FormControl>

      <Controller
        control={control}
        name={names.name}
        render={({ field: { value } }) => (
          <TextField
            fullWidth
            label={
              <LabelWrapper>
                <Text>Title on the banner</Text>
              </LabelWrapper>
            }
            value={value}
            onChange={getEventValueHandler(curry(setValue)(names.name))}
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
                <Text>Description on the banner</Text>
              </LabelWrapper>
            }
            value={value}
            onChange={getEventValueHandler(curry(setValue)(names.description))}
          />
        )}
      />
    </>
  );
};
