import React from "react";
import { EditProjectsPageForm } from "~/layouts/EditProjectsPageForm";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { Panel } from "~/shared/components/Panel";
import { PageTableTitle } from "~shared/components/PageTableTitle";

export const EditProjectsPage: React.FC = () => (
  <PageWrapper>
    <PageTableTitle title='Projects page' sitePath='grants/projects' />
    <Panel>
      <EditProjectsPageForm />
    </Panel>
  </PageWrapper>
);
