import React from "react";
import { EditProjectsPageForm } from "~/layouts/EditProjectsPageForm";
import { PageTitle } from "~/shared/components/PageTitle";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { Panel } from "~/shared/components/Panel";
import { Text } from "~/shared/components/Text";

export const EditProjectsPage: React.FC = () => (
  <PageWrapper>
    <PageTitle>
      <Text>Edit projects page</Text>
    </PageTitle>
    <Panel>
      <EditProjectsPageForm />
    </Panel>
  </PageWrapper>
);
