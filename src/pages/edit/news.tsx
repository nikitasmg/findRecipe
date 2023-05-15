import React from "react";
import { EditNewsPageForm } from "~/layouts/EditNewsPageForm";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { Panel } from "~/shared/components/Panel";
import { PageTableTitle } from "~shared/components/PageTableTitle";

export const EditNewsPage: React.FC = () => (
  <PageWrapper>
    <PageTableTitle title='News page' sitePath='news' />
    <Panel>
      <EditNewsPageForm />
    </Panel>
  </PageWrapper>
);
