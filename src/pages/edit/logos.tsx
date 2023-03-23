import React from "react";
import { EditLogosPageForm } from "~/layouts/EditLogosPageForm";
import { PageTitle } from "~/shared/components/PageTitle";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { Panel } from "~/shared/components/Panel";
import { Text } from "~/shared/components/Text";

export const EditLogosPage: React.FC = () => (
  <PageWrapper>
    <PageTitle>
      <Text>Edit logos page</Text>
    </PageTitle>
    <Panel>
      <EditLogosPageForm />
    </Panel>
  </PageWrapper>
);
