import React from "react";
import { EditAnoBiomedPageForm } from "~/modules/EditAnoBiomedPageForm";
import { PageTitle } from "~/shared/components/PageTitle";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { Panel } from "~/shared/components/Panel";
import { Text } from "~/shared/components/Text";

export const EditAnoBiomedPage: React.FC = () => (
  <PageWrapper>
    <PageTitle>
      <Text>Edit ano-biomed page</Text>
    </PageTitle>
    <Panel>
      <EditAnoBiomedPageForm />
    </Panel>
  </PageWrapper>
);
