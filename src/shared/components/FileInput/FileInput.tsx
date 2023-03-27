import { Box, Icon, Input, Typography } from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import DescriptionIcon from "@mui/icons-material/Description";
import CancelIcon from "@mui/icons-material/Cancel";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Text } from "../Text";
import { Link } from "../Link";

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

  console.log(url, fileUrl);

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
        <Box className='flex items-center relative w-[310px] h-[100px] transition hover:bg-gray-200 rounded-xl border-dashed border-2 border-primary'>
          <Input
            inputProps={{
              className: "!absolute top-0 left-0 right-0 bottom-0 w-full h-full opacity-0 z-2"
            }}
            className='!absolute w-full h-full opacity-0'
            type='file'
            id={id}
            onChange={handleFile}
          />
          <label htmlFor={id} className='w-full text-center text-primary text-lg cursor-pointer'>
            <Icon className='w-auto h-[50px]' component={CloudUploadIcon} />
            <Text>Upload or drop file</Text>
          </label>
        </Box>
      )}

      {isPreview && (
        <Box className='flex items-center gap-10 w-[310px]'>
          <Box className='flex gap-2 items-center w-[80%]'>
            <DescriptionIcon />
            <Link to={url || fileUrl} target='_blank'>
              <Typography className='text-ellipsis overflow-hidden'>
                {selectedFile?.name ?? fileName}
              </Typography>
            </Link>
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
