import React from "react";
import { Box } from "@mui/material";
import { Folders } from "./components/Folders";
import { LinkedDocuments } from "./components/LinkedDocuments";

export const LinkedDocumentsPreview: React.FC = () => {
  return (
    <Box className='flex flex-col gap-10'>
      <Folders />
      <LinkedDocuments />
    </Box>
  );
};
