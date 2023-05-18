import React from "react";
import { Box } from "@mui/material";
import { StaffControlTabs } from "~/layouts/StaffControlTabs";
import { PageTitle } from "~/shared/components/PageTitle";
import { Text } from "~/shared/components/Text";
import { Panel } from "~shared/components/Panel";
import { PageWrapper } from "~/shared/components/PageWrapper";

export const StaffControl: React.FC = () => {
  return (
    <PageWrapper>
      <PageTitle>
        <Text>Staff control</Text>
      </PageTitle>
      <Panel>
        <Box className='p-4'>
          <StaffControlTabs />
        </Box>
      </Panel>
    </PageWrapper>
  );
};
