import { Box, Icon, Input, InputProps } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import React, { ChangeEvent, forwardRef, useEffect, useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useAlertsStore } from "~shared/stores/alerts";
import { Text } from "../Text";

type Props = {
  id?: string;
  onChange: (file?: File | null) => void;
  onDelete?: () => void;
  withPreview?: boolean;
  url?: string;
} & InputProps;

export const ImageInput = forwardRef<HTMLDivElement, Props>(
  ({ id, onChange, withPreview = true, url = "", onDelete, ...other }, ref) => {
    const [selectedImage, setSelectedImage] = useState<File | null>();

    const [imageUrl, setImageUrl] = useState(url);

    const addAlert = useAlertsStore((state) => state.addAlert);

    useEffect(() => {
      if (selectedImage) {
        setImageUrl(URL.createObjectURL(selectedImage));
        return;
      }
      setImageUrl("");
    }, [selectedImage]);

    const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
      const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif|\.bmp|\.webp)$/i;

      const filePath = e.target.value;

      if (!allowedExtensions.exec(filePath)) {
        addAlert("error", "Invalid file type");
        return;
      }

      onChange?.(e.target.files?.[0]);
      setSelectedImage(e.target.files?.[0]);
    };

    const handleDeleteImage = () => {
      onDelete?.();
      setSelectedImage(null);
    };

    const isImagePreview = url || (withPreview && imageUrl && selectedImage);

    return (
      <Box ref={ref} className='w-full flex justify-center'>
        {!isImagePreview && (
          <Box className='flex items-center relative w-full h-[100px] transition hover:bg-gray-200 rounded-xl border-dashed border-2 border-primary'>
            <Input
              inputProps={{
                accept: "image/*",
                className: "!absolute top-0 left-0 right-0 bottom-0 w-full h-full opacity-0 z-2"
              }}
              className='!absolute w-full h-full opacity-0'
              type='file'
              id={id}
              onChange={handleImage}
              {...other}
            />
            <label htmlFor={id} className='w-full text-center text-primary text-lg cursor-pointer'>
              <Icon className='w-auto h-[50px]' component={CloudUploadIcon} />
              <Text>Upload or drop image</Text>
            </label>
          </Box>
        )}
        {isImagePreview && (
          <Box className='relative text-red-700 w-fit p-6'>
            <CancelIcon
              onClick={handleDeleteImage}
              onKeyPress={handleDeleteImage}
              tabIndex={0}
              className='absolute right-0 top-0 cursor-pointer'
            />
            <img src={imageUrl || url} alt={selectedImage?.name} className='h-auto w-[100%]' />
          </Box>
        )}
      </Box>
    );
  }
);

ImageInput.displayName = "ImageInput";
