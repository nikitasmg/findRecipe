import React from "react";
import { EditControlPageForm } from "~/layouts/EditControlPageForm";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { Panel } from "~/shared/components/Panel";
import { PageTableTitle } from "~shared/components/PageTableTitle";

export const EditControlPage: React.FC = () => (
  <PageWrapper>
    <PageTableTitle title='Staff control page' sitePath='about/control' />
    <Panel>
      <EditControlPageForm />
    </Panel>
  </PageWrapper>
);
