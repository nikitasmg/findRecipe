import React from "react";
import { EditControlPageForm } from "~/modules/EditControlPageForm";
import { PageTitle } from "~/shared/components/PageTitle";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { Panel } from "~/shared/components/Panel";
import { Text } from "~/shared/components/Text";

export const EditControlPage: React.FC = () => (
  <PageWrapper>
    <PageTitle>
      <Text>Edit staff control page</Text>
    </PageTitle>
    <Panel>
      <EditControlPageForm />
    </Panel>
  </PageWrapper>
);
