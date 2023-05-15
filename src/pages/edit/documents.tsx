import React from "react";
import { EditDocumentsPageForm } from "~/layouts/EditDocumentsPageForm";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { Panel } from "~/shared/components/Panel";
import { PageTableTitle } from "~shared/components/PageTableTitle";

export const EditDocumentsPage: React.FC = () => (
  <PageWrapper>
    <PageTableTitle title='Documents page' sitePath='about/documents' />
    <Panel>
      <EditDocumentsPageForm />
    </Panel>
  </PageWrapper>
);
