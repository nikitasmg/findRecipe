import { FormControl, FormLabel, TextField } from "@mui/material";
import { curry } from "rambda";
import React from "react";
import { Control, Controller, FieldErrors, UseFormGetValues } from "react-hook-form";
import { GalleryImage, UpdateGalleryInput, UploadGalleryInput } from "~/generated/graphql";
import { GalleryInput } from "~/shared/components/GalleryInput";
import { HelperText } from "~/shared/components/HelperText";
import { Text } from "~/shared/components/Text";
import { getEventValueHandler } from "~/shared/lib/events";
import { fileFromBlobUrl } from "~/shared/lib/fileFromBlobUrl";
import { getErrorMessage } from "~/shared/lib/getError";

export type BannerFields = {
  gallery?: GalleryImage[];
  uploadGalleryImages?: UploadGalleryInput[];
  deleteGalleryImages?: number[];
  updateGallery?: UpdateGalleryInput[];
  "params.banner.title"?: string;
  "params.banner.description"?: string;
};

type Props = {
  errors?: FieldErrors<BannerFields>;
  setValue?: (name: keyof BannerFields, value: unknown) => void;
  getValues?: UseFormGetValues<BannerFields>;
  control?: Control<BannerFields, unknown>;
};

export const Banner: React.FC<Props> = ({ errors, setValue, getValues, control }) => {
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
        name='params.banner.title'
        render={({ field: { value } }) => (
          <TextField
            fullWidth
            label={<Text>Title on the banner</Text>}
            value={value}
            onChange={getEventValueHandler(curry(setValue)("params.banner.title"))}
          />
        )}
      />

      <Controller
        control={control}
        name='params.banner.description'
        render={({ field: { value } }) => (
          <TextField
            fullWidth
            label={<Text>Description on the banner</Text>}
            value={value}
            onChange={getEventValueHandler(curry(setValue)("params.banner.description"))}
          />
        )}
      />
    </>
  );
};
