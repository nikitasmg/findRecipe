import React from "react";
import { EditAnoBiomedPageForm } from "~/layouts/EditAnoBiomedPageForm";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { Panel } from "~/shared/components/Panel";
import { PageTableTitle } from "~shared/components/PageTableTitle";

export const EditAnoBiomedPage: React.FC = () => (
  <PageWrapper>
    <PageTableTitle title='Ano-biomed page' sitePath='about/ano-biomed' />
    <Panel>
      <EditAnoBiomedPageForm />
    </Panel>
  </PageWrapper>
);
