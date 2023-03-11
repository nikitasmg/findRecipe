import React from "react";
import { EditAboutPageForm } from "~/modules/EditAboutPageForm";
import { PageTitle } from "~/shared/components/PageTitle";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { Panel } from "~/shared/components/Panel";
import { Text } from "~/shared/components/Text";

export const EditAboutPage: React.FC = () => (
  <PageWrapper>
    <PageTitle>
      <Text>Edit about page</Text>
    </PageTitle>
    <Panel>
      <EditAboutPageForm />
    </Panel>
  </PageWrapper>
);
