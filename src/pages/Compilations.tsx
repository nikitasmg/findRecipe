import { Box } from "@mui/material";
import React from "react";
import { CompilationsTable } from "~/modules/CompilationsTable";
import { PageTitle } from "~/shared/components/PageTitle";
import { Text } from "~/shared/components/Text";

export const Compilations: React.FC = () => {
  return (
    <Box className='h-full'>
      <PageTitle>
        <Text className='px-4'>Compilations</Text>
      </PageTitle>
      <CompilationsTable />
    </Box>
  );
};
