import React from "react";
import { EditResultPageForm } from "~/layouts/EditResultPageForm";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { Panel } from "~/shared/components/Panel";
import { PageTableTitle } from "~shared/components/PageTableTitle";

export const EditResultPage: React.FC = () => (
  <PageWrapper>
    <PageTableTitle title='Result page' sitePath='about/result' />
    <Panel>
      <EditResultPageForm />
    </Panel>
  </PageWrapper>
);
