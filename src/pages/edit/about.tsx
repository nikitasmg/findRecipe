import React from "react";
import { EditAboutPageForm } from "~/layouts/EditAboutPageForm";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { Panel } from "~/shared/components/Panel";
import { PageTableTitle } from "~shared/components/PageTableTitle";

export const EditAboutPage: React.FC = () => (
  <PageWrapper>
    <PageTableTitle title='About page' sitePath='about' />
    <Panel>
      <EditAboutPageForm />
    </Panel>
  </PageWrapper>
);
