import React from "react";
import { EditCommonPageForm } from "~/layouts/EditCommonPageForm";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { Panel } from "~/shared/components/Panel";
import { PageTableTitle } from "~shared/components/PageTableTitle";

export const EditCommonInfoPage: React.FC = () => (
  <PageWrapper>
    <PageTableTitle title='Common info page' sitePath='about/common' />
    <Panel>
      <EditCommonPageForm />
    </Panel>
  </PageWrapper>
);
