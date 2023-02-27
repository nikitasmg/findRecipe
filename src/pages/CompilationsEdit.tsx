import { Box } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { PageTitle } from "~/shared/components/PageTitle";
import { Text } from "~/shared/components/Text";
import { CompilationEditTable } from "~/modules/CompilationEditTable";

export const CompilationsEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <Box className='h-full'>
      <PageTitle>
        <Text className='px-4'>Compilations edit</Text>
      </PageTitle>
      <CompilationEditTable id={Number(id) - 1} />
    </Box>
  );
};
