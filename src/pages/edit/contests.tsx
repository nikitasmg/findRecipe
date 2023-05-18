import React from "react";
import { EditContestsPageForm } from "~/layouts/EditContestsPageForm";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { Panel } from "~/shared/components/Panel";
import { PageTableTitle } from "~shared/components/PageTableTitle";

export const EditContestsPage: React.FC = () => (
  <PageWrapper>
    <PageTableTitle title='Contests page' sitePath='grants/contests' />
    <Panel>
      <EditContestsPageForm />
    </Panel>
  </PageWrapper>
);
