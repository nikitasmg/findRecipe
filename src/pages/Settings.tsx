import { Box } from "@mui/material";
import React from "react";
import { PageTitle } from "~/shared/components/PageTitle";
import { Text } from "~/shared/components/Text";
import { Panel } from "~shared/components/Panel";
import { SettingsTabs } from "~/modules/SettingsTabs";

export const Settings: React.FC = () => {
  return (
    <Box className='h-full'>
      <PageTitle>
        <Text className='px-4'>Settings</Text>
      </PageTitle>
      <Panel>
        <SettingsTabs />
      </Panel>
    </Box>
  );
};
