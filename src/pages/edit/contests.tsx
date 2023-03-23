import React from "react";
import { EditContestsPageForm } from "~/layouts/EditContestsPageForm";
import { PageTitle } from "~/shared/components/PageTitle";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { Panel } from "~/shared/components/Panel";
import { Text } from "~/shared/components/Text";

export const EditContestsPage: React.FC = () => (
  <PageWrapper>
    <PageTitle>
      <Text>Edit contests page</Text>
    </PageTitle>
    <Panel>
      <EditContestsPageForm />
    </Panel>
  </PageWrapper>
);
