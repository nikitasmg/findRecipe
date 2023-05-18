import React from "react";
import { PageTitle } from "~/shared/components/PageTitle";
import { Text } from "~/shared/components/Text";
import { Panel } from "~shared/components/Panel";
import { SettingsTabs } from "~/modules/SettingsForm";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { Box } from "@mui/material";

export const Settings: React.FC = () => {
  return (
    <PageWrapper>
      <PageTitle>
        <Text>Settings</Text>
      </PageTitle>
      <Panel>
        <Box className='p-4'>
          <SettingsTabs />
        </Box>
      </Panel>
    </PageWrapper>
  );
};
