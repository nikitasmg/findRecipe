import React from "react";
import { Panel } from "~shared/components/Panel";
import { SettingsTabs } from "~/modules/SettingsForm";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { PageTableTitle } from "~shared/components/PageTableTitle";

export const Settings: React.FC = () => {
  return (
    <PageWrapper>
      <PageTableTitle title='Settings' />
      <Panel>
        <SettingsTabs />
      </Panel>
    </PageWrapper>
  );
};
