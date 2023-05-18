import React from "react";
import { EditIndexPageForm } from "~/layouts/EditIndexPageForm";
import { PageTitle } from "~/shared/components/PageTitle";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { Panel } from "~/shared/components/Panel";
import { Text } from "~/shared/components/Text";

export const EditIndexPage: React.FC = () => (
  <PageWrapper>
    <PageTitle>
      <Text>Edit index page</Text>
    </PageTitle>
    <Panel>
      <EditIndexPageForm />
    </Panel>
  </PageWrapper>
);
