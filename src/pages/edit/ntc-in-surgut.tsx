import React from "react";
import { PageTitle } from "~/shared/components/PageTitle";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { Panel } from "~/shared/components/Panel";
import { Text } from "~/shared/components/Text";
import { EditNtcInSurgutPageForm } from "~/layouts/EditNtcInSurgutPageForm";

export const EditNtcInSurgutPage: React.FC = () => (
  <PageWrapper>
    <PageTitle>
      <Text>Edit NTC in Surgut page</Text>
    </PageTitle>
    <Panel>
      <EditNtcInSurgutPageForm />
    </Panel>
  </PageWrapper>
);
