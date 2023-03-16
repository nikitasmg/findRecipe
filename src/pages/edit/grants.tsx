import React from "react";
import { PageTitle } from "~/shared/components/PageTitle";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { Panel } from "~/shared/components/Panel";
import { Text } from "~/shared/components/Text";
import { EditGrantsPageForm } from "~/modules/EditGrantsPageForm";

export const EditGrantsPage: React.FC = () => (
  <PageWrapper>
    <PageTitle>
      <Text>Edit grant support page</Text>
    </PageTitle>
    <Panel>
      <EditGrantsPageForm />
    </Panel>
  </PageWrapper>
);
