import { Box, Input, InputProps } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Text } from "../Text";

type Props = {
  id: string;
  onChange: (file?: File | null) => void;
  onDelete?: () => void;
  withPreview?: boolean;
  url?: string;
} & InputProps;

export const ImageInput: React.FC<Props> = ({
  id,
  onChange,
  withPreview = true,
  url = "",
  onDelete,
  ...other
}) => {
  const [selectedImage, setSelectedImage] = useState<File | null>();
  const [imageUrl, setImageUrl] = useState(url);

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.files?.[0]);
    setSelectedImage(e.target.files?.[0]);
  };

  const handleDeleteImage = () => {
    onDelete?.();
    setSelectedImage(null);
  };

  const isImagePreview = url || (withPreview && imageUrl && selectedImage);

  return (
    <>
      {!isImagePreview && (
        <Box className='flex items-center relative w-full h-[100px] transition bg-gray-200 hover:bg-gray-300 hover:underline rounded-xl p-6'>
          <Input
            inputProps={{
              accept: "image/*"
            }}
            className='!absolute top-0 left-0 w-full h-full opacity-0 z-2'
            type='file'
            id={id}
            onChange={handleImage}
            {...other}
          />
          <label htmlFor={id} className='w-full text-center'>
            <Text>Upload or drop image</Text>
          </label>
        </Box>
      )}
      {isImagePreview && (
        <Box className='relative text-red-700 w-fit p-6'>
          <CancelIcon onClick={handleDeleteImage} className='absolute right-0 top-0' />
          <img
            src={imageUrl || url}
            alt={selectedImage?.name}
            className='h-[100px]'
            height='100px'
          />
        </Box>
      )}
    </>
  );
};
