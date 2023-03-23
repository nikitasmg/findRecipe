import React, { ChangeEventHandler } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box, Button } from "@mui/material";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { useCreateLinkedDocumentMutation, LinkedDocument } from "~/generated/graphql";
import { Text } from "~/shared/components/Text";

type Props = {
  onUpload: (documents: LinkedDocument[]) => void;
};

export const UploadDocumentsButton: React.FC<Props> = ({ onUpload }) => {
  const client = useGraphqlClient();

  const { mutateAsync: create } = useCreateLinkedDocumentMutation(client);

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

      console.log(savedFiles);

      onUpload(savedFiles);
    });
  };

  return (
    <Box>
      <Button variant='outlined' component='label' startIcon={<CloudUploadIcon />}>
        <Text>Upload document</Text>
        <input hidden accept='image/*' multiple type='file' onChange={onChange} />
      </Button>
    </Box>
  );
};
