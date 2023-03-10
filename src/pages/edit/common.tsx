import React from "react";
import { EditCommonPageForm } from "~/modules/EditCommonPageForm";
import { PageTitle } from "~/shared/components/PageTitle";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { Panel } from "~/shared/components/Panel";
import { Text } from "~/shared/components/Text";

export const EditCommonInfoPage: React.FC = () => (
  <PageWrapper>
    <PageTitle>
      <Text>Edit common info page</Text>
    </PageTitle>
    <Panel>
      <EditCommonPageForm />
    </Panel>
  </PageWrapper>
);
