import React from "react";
import { EditOrdersPageForm } from "~/layouts/EditOrdersPageForm";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { Panel } from "~/shared/components/Panel";
import { PageTableTitle } from "~shared/components/PageTableTitle";

export const EditOrdersPage: React.FC = () => (
  <PageWrapper>
    <PageTableTitle title='Orders page' sitePath='about/orders' />
    <Panel>
      <EditOrdersPageForm />
    </Panel>
  </PageWrapper>
);
