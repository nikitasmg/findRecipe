import { Box } from "@mui/material";
import React from "react";
import { usePaths } from "~/app/providers/Paths";
import { PageTitle } from "~/shared/components/PageTitle";
import { PathsPanel } from "~/shared/components/PathsPanel";
import { Text } from "~/shared/components/Text";

export const Home: React.FC = () => {
  const paths = usePaths();

  return (
    <Box className='h-full'>
      <PageTitle>
        <Text className='px-4'>Home</Text>
      </PageTitle>
      <PathsPanel paths={paths} />
    </Box>
  );
};
