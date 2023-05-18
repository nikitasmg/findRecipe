import React from "react";
import { EditStaffPageForm } from "~/layouts/EditStaffPageForm";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { Panel } from "~/shared/components/Panel";
import { PageTableTitle } from "~shared/components/PageTableTitle";

export const EditStaffPage: React.FC = () => (
  <PageWrapper>
    <PageTableTitle title='Staff page' sitePath='about/staff' />
    <Panel>
      <EditStaffPageForm />
    </Panel>
  </PageWrapper>
);
