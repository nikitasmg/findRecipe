import { AlertColor, Box, Icon, Input, InputProps } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import React, { ChangeEvent, forwardRef, useEffect, useState } from "react";
import { Text } from "../Text";
import { CloudUploadIcon } from "~shared/components/Icons";

type Props = {
  id?: string;
  onChange: (file?: File | null) => void;
  addAlert: (severity: AlertColor, message: string) => void;
  onDelete?: () => void;
  withPreview?: boolean;
  url?: string;
} & InputProps;

export const ImageInput = forwardRef<HTMLDivElement, Props>(
  ({ id, onChange, withPreview = true, url = "", onDelete, addAlert, ...other }, ref) => {
    const [selectedImage, setSelectedImage] = useState<File | null>();

    const [imageUrl, setImageUrl] = useState(url);

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
          <Box className='flex items-center relative w-full h-[200px] transition hover:bg-gray-200 rounded-xl border border-dashed border-primary'>
            <Input
              inputProps={{
                accept: "image/*",
                className: "!absolute top-0 left-0 right-0 bottom-0 w-full h-full opacity-0 z-2 p-0"
              }}
              className='!absolute w-full h-full opacity-0'
              type='file'
              id={id}
              onChange={handleImage}
              {...other}
            />
            <label htmlFor={id} className='w-full flex flex-col items-center cursor-pointer p-9'>
              <Icon className='w-[71px] h-[71px]' component={CloudUploadIcon} />
              <Text className='pt-5 lg:w-[220px] text-center font-medium text-base'>
                Upload or drop image
              </Text>
            </label>
          </Box>
        )}
        {isImagePreview && (
          <Box className='relative text-red-700 p-6'>
            <CancelIcon
              onClick={handleDeleteImage}
              onKeyPress={handleDeleteImage}
              tabIndex={0}
              className='absolute right-0 top-0 cursor-pointer'
            />
            <img src={imageUrl || url} alt={selectedImage?.name} className='max-w-[200px]' />
          </Box>
        )}
      </Box>
    );
  }
);

ImageInput.displayName = "ImageInput";
