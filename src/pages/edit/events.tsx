import React from "react";
import { EditEventsPageForm } from "~/layouts/EditEventsPageForm";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { Panel } from "~/shared/components/Panel";
import { PageTableTitle } from "~shared/components/PageTableTitle";

export const EditEventsPage: React.FC = () => (
  <PageWrapper>
    <PageTableTitle title='Events page' sitePath='events' />
    <Panel>
      <EditEventsPageForm />
    </Panel>
  </PageWrapper>
);
