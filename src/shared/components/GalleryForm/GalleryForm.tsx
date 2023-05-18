import { Box, FormControl, FormLabel } from "@mui/material";
import React from "react";
import { Control, Controller, FieldErrors, UseFormGetValues } from "react-hook-form";
import { GalleryImage, UpdateGalleryInput, UploadGalleryInput } from "~/generated/graphql";
import { fileFromBlobUrl } from "~/shared/lib/fileFromBlobUrl";
import { getErrorMessage } from "~/shared/lib/getError";
import { GalleryInput } from "../GalleryInput";
import { HelperText } from "../HelperText";
import { Text } from "../Text";

type GalleryImageFields = {
  gallery?: GalleryImage[];
  uploadGalleryImages?: UploadGalleryInput[];
  deleteGalleryImages?: number[];
  updateGallery?: UpdateGalleryInput[];
};

type Props = {
  errors: FieldErrors<GalleryImageFields>;
  setValue: (name: string, value: unknown) => void;
  getValues: UseFormGetValues<GalleryImageFields>;
  control: Control<GalleryImageFields, unknown>;
};

export const GalleryForm: React.FC<Props> = ({ errors, control, getValues, setValue }) => {
  const getError = getErrorMessage(errors);

  const handleUpload = (images: Partial<GalleryImage>[]) => {
    const current = getValues("uploadGalleryImages");

    const newFiles: Promise<UploadGalleryInput[]> = Promise.all(
      (images ?? [])?.map(async (image: Partial<GalleryImage>) => ({
        upload: image.url ? await fileFromBlobUrl(image.url) : "",
        sort: image.sort,
        alt: image.alt
      }))
    );

    newFiles.then((files) => {
      setValue("uploadGalleryImages", (current ?? []).concat(files));
    });
  };

  const handleDelete = (image: GalleryImage) => {
    const current = getValues("deleteGalleryImages");
    setValue("deleteGalleryImages", (current ?? []).concat(image.id));
  };

  const handleUpdate = (images: GalleryImage) => {
    const current = getValues("updateGallery");
    setValue("updateGallery", (current ?? []).concat(images));
  };

  return (
    <Box className='flex flex-col gap-6 grow-[2] lg:w-[70%] order-last'>
      <FormControl fullWidth>
        <FormLabel>
          <Text component='span'>Gallery</Text>
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
    </Box>
  );
};
