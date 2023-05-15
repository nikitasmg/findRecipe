import React from "react";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { Panel } from "~/shared/components/Panel";
import { EditNtcInSurgutPageForm } from "~/layouts/EditNtcInSurgutPageForm";
import { PageTableTitle } from "~shared/components/PageTableTitle";

export const EditNtcInSurgutPage: React.FC = () => (
  <PageWrapper>
    <PageTableTitle title='NTC in Surgut page' sitePath='ntc-in-surgut' />
    <Panel>
      <EditNtcInSurgutPageForm />
    </Panel>
  </PageWrapper>
);
