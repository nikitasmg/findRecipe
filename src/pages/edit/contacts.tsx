import React from "react";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { Panel } from "~/shared/components/Panel";
import { EditContactsPageForm } from "~/layouts/EditContactsPageForm";
import { PageTableTitle } from "~shared/components/PageTableTitle";

export const EditContactsPage: React.FC = () => (
  <PageWrapper>
    <PageTableTitle title='Contacts page' sitePath='contacts' />
    <Panel>
      <EditContactsPageForm />
    </Panel>
  </PageWrapper>
);
