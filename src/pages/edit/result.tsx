import React from "react";
import { EditResultPageForm } from "~/modules/EditResultPageForm";
import { PageTitle } from "~/shared/components/PageTitle";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { Panel } from "~/shared/components/Panel";
import { Text } from "~/shared/components/Text";

export const EditResultPage: React.FC = () => (
  <PageWrapper>
    <PageTitle>
      <Text>Edit result page</Text>
    </PageTitle>
    <Panel>
      <EditResultPageForm />
    </Panel>
  </PageWrapper>
);
