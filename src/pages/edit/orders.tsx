import React from "react";
import { EditOrdersPageForm } from "~/modules/EditOrdersPageForm";
import { PageTitle } from "~/shared/components/PageTitle";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { Panel } from "~/shared/components/Panel";
import { Text } from "~/shared/components/Text";

export const EditOrdersPage: React.FC = () => (
  <PageWrapper>
    <PageTitle>
      <Text>Edit orders page</Text>
    </PageTitle>
    <Panel>
      <EditOrdersPageForm />
    </Panel>
  </PageWrapper>
);
