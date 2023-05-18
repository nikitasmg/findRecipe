import React from "react";
import { EditDocumentsPageForm } from "~/layouts/EditDocumentsPageForm";
import { PageTitle } from "~/shared/components/PageTitle";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { Panel } from "~/shared/components/Panel";
import { Text } from "~/shared/components/Text";

export const EditDocumentsPage: React.FC = () => (
  <PageWrapper>
    <PageTitle>
      <Text>Edit documents page</Text>
    </PageTitle>
    <Panel>
      <EditDocumentsPageForm />
    </Panel>
  </PageWrapper>
);
