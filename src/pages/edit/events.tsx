import React from "react";
import { EditEventsPageForm } from "~/modules/EditEventsPageForm";
import { PageTitle } from "~/shared/components/PageTitle";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { Panel } from "~/shared/components/Panel";
import { Text } from "~/shared/components/Text";

export const EditEventsPage: React.FC = () => (
  <PageWrapper>
    <PageTitle>
      <Text>Edit events page</Text>
    </PageTitle>
    <Panel>
      <EditEventsPageForm />
    </Panel>
  </PageWrapper>
);
