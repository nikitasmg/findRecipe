import React from "react";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { Panel } from "~/shared/components/Panel";
import { EditGrantsPageForm } from "~/layouts/EditGrantsPageForm";
import { PageTableTitle } from "~shared/components/PageTableTitle";

export const EditGrantsPage: React.FC = () => (
  <PageWrapper>
    <PageTableTitle title='Grant support page' sitePath='grants' />
    <Panel>
      <EditGrantsPageForm />
    </Panel>
  </PageWrapper>
);
