import { Box, Input, Typography } from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import DescriptionIcon from "@mui/icons-material/Description";
import CancelIcon from "@mui/icons-material/Cancel";
import { Text } from "../Text";

type Props = {
  id: string;
  onFileChange?: (file?: File | null) => void;
  onUrlChange?: (url?: string) => void;
  onDelete?: () => void;
  withPreview?: boolean;
  url?: string;
  fileName?: string;
};

export const FileInput: React.FC<Props> = ({
  id,
  onFileChange,
  onUrlChange,
  withPreview = true,
  url = "",
  fileName = "",
  onDelete
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>();
  const [fileUrl, setFileUrl] = useState(url);

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    onFileChange?.(e.target.files?.[0]);
    setSelectedFile(e.target.files?.[0]);
  };

  const handleDeleteFile = () => {
    onDelete?.();
    setSelectedFile(null);
    setFileUrl("");
  };

  const isPreview = !!url || (withPreview && !!fileUrl && !!selectedFile);

  useEffect(() => {
    if (selectedFile) {
      setFileUrl(URL.createObjectURL(selectedFile));
      return;
    }
  }, [selectedFile]);

  useEffect(() => {
    if (fileUrl !== url) {
      onUrlChange?.(fileUrl);
    }
  }, [fileUrl, onUrlChange, url]);

  return (
    <>
      {!isPreview && (
        <Box className='flex items-center relative w-[310px] h-[100px] transition bg-gray-200 hover:bg-gray-300 hover:underline rounded-xl p-6'>
          <Input
            className='!absolute top-0 left-0 w-full h-full opacity-0 z-2'
            type='file'
            id={id}
            onChange={handleFile}
          />
          <label htmlFor={id} className='w-full text-center'>
            <Text>Upload or drop file</Text>
          </label>
        </Box>
      )}

      {isPreview && (
        <Box className='flex items-center gap-10 w-[310px]'>
          <Box className='flex gap-2 items-center w-[80%]'>
            <DescriptionIcon />
            <Typography className='text-ellipsis overflow-hidden'>
              {selectedFile?.name ?? fileName}
            </Typography>
          </Box>
          <CancelIcon
            onClick={handleDeleteFile}
            onKeyPress={handleDeleteFile}
            tabIndex={0}
            className='text-red-700 right-0 top-0 cursor-pointer outline-1'
          />
        </Box>
      )}
    </>
  );
};
