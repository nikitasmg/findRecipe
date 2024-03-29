import React, { ChangeEventHandler } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box, Button } from "@mui/material";
import {
  CreateLinkedDocumentMutation,
  LinkedDocument,
  LinkedDocumentInput
} from "~/generated/graphql";
import { Text } from "~/shared/components/Text";

type Props = {
  onUpload: (documents: LinkedDocument[]) => void;
  create: ({ input }: { input: LinkedDocumentInput }) => Promise<CreateLinkedDocumentMutation>;
  multiple?: boolean;
  className?: string;
};

export const UploadDocumentsButton: React.FC<Props> = ({
  onUpload,
  create,
  className,
  multiple = true
}) => {
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = Array.from(e.target.files ?? []).map((file) => ({
      user_name: file.name,
      upload: file
    }));

    const uploadedFiles = Promise.allSettled(files.map((file) => create({ input: file })));

    uploadedFiles.then((files) => {
      const savedFiles: LinkedDocument[] = files
        .map((result): LinkedDocument | void => {
          if (result.status === "fulfilled") {
            return result.value.createLinkedDocument as LinkedDocument;
          }
        })
        .filter(Boolean) as LinkedDocument[];

      onUpload(savedFiles);
    });
  };

  return (
    <Box className={className}>
      <Button
        className='h-full'
        variant='outlined'
        component='label'
        startIcon={<CloudUploadIcon />}
      >
        <Text>Upload documents</Text>
        <input hidden multiple={multiple} type='file' onChange={onChange} />
      </Button>
    </Box>
  );
};
