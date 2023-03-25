import { AlertColor, Avatar, Box, Icon, Input, InputProps } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Text } from "../Text";

type Props = {
  id: string;
  onChange: (file?: File | null) => void;
  addAlert: (severity: AlertColor, message: string) => void;
  onDelete?: () => void;
  withPreview?: boolean;
  url?: string;
} & InputProps;

export const AvatarInput: React.FC<Props> = ({
  id,
  onChange,
  withPreview = true,
  url = "",
  onDelete,
  addAlert,
  ...other
}) => {
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
    <>
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
        <Box className='relative text-red-700 p-6 min-w-[310px] flex justify-center'>
          <CancelIcon
            onClick={handleDeleteImage}
            onKeyPress={handleDeleteImage}
            tabIndex={0}
            className='absolute left-[65%] top-0 cursor-pointer'
          />
          <Avatar sx={{ width: "100px", height: "auto" }} src={imageUrl} />
        </Box>
      )}
    </>
  );
};
