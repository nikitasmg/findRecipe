import React from "react";
import { EditNewsPageForm } from "~/layouts/EditNewsPageForm";
import { PageTitle } from "~/shared/components/PageTitle";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { Panel } from "~/shared/components/Panel";
import { Text } from "~/shared/components/Text";

export const EditNewsPage: React.FC = () => (
  <PageWrapper>
    <PageTitle>
      <Text>Edit news page</Text>
    </PageTitle>
    <Panel>
      <EditNewsPageForm />
    </Panel>
  </PageWrapper>
);
