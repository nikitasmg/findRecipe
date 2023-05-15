import React from "react";
import { EditLogosPageForm } from "~/layouts/EditLogosPageForm";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { Panel } from "~/shared/components/Panel";
import { PageTableTitle } from "~shared/components/PageTableTitle";

export const EditLogosPage: React.FC = () => (
  <PageWrapper>
    <PageTableTitle title='Logos page' sitePath='about/logos' />
    <Panel>
      <EditLogosPageForm />
    </Panel>
  </PageWrapper>
);
