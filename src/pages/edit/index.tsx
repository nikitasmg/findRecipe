import React from "react";
import { EditIndexPageForm } from "~/layouts/EditIndexPageForm";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { Panel } from "~/shared/components/Panel";
import { PageTableTitle } from "~shared/components/PageTableTitle";

export const EditIndexPage: React.FC = () => (
  <PageWrapper>
    <PageTableTitle title='Index page' sitePath='/' />
    <Panel>
      <EditIndexPageForm />
    </Panel>
  </PageWrapper>
);
