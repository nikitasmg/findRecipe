import React from "react";
import { PageTitle } from "~/shared/components/PageTitle";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { Panel } from "~/shared/components/Panel";
import { Text } from "~/shared/components/Text";
import { EditContactsPageForm } from "~/modules/EditContactsPageForm";

export const EditContactsPage: React.FC = () => (
  <PageWrapper>
    <PageTitle>
      <Text>Edit contacts page</Text>
    </PageTitle>
    <Panel>
      <EditContactsPageForm />
    </Panel>
  </PageWrapper>
);
