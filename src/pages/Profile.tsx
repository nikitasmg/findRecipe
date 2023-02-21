import { Box } from "@mui/material";
import React from "react";
import { Panel } from "~/shared/components/Panel";
import { ProfileNavigation } from "~/shared/components/ProfileNavigation";
import { Text } from "~/shared/components/Text";
import { PageTitle } from "~shared/components/PageTitle/PageTitle";

export const Profile: React.FC = () => {
  return (
    <Box className='h-full'>
      <PageTitle>
        <Text className='px-4'>Profile</Text>
      </PageTitle>
      <ProfileNavigation />
      <Panel></Panel>
    </Box>
  );
};
