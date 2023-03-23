import React from "react";
import { Box } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Text } from "~/shared/components/Text";
import { Button } from "~/shared/components/Button";
import { Groups } from "./components/Groups";
import { LinkedDocuments } from "./components/LinkedDocuments";

export const LinkedDocumentsPreview: React.FC = () => {
  return (
    <Box className='flex flex-col gap-10 p-4'>
      <Box className='flex flex-wrap justify-between gap-6'>
        <Text component='h1' variant='h4' whiteSpace='nowrap'>
          Document manager
        </Text>
        <Button variant='outlined' startIcon={<CloudUploadIcon />}>
          Upload document
        </Button>
      </Box>
      <Groups />
      <LinkedDocuments />
    </Box>
  );
};
