import React from "react";
import { EditStaffPageForm } from "~/modules/EditStaffPageForm";
import { PageTitle } from "~/shared/components/PageTitle";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { Panel } from "~/shared/components/Panel";
import { Text } from "~/shared/components/Text";

export const EditStaffPage: React.FC = () => (
  <PageWrapper>
    <PageTitle>
      <Text>Edit staff page</Text>
    </PageTitle>
    <Panel>
      <EditStaffPageForm />
    </Panel>
  </PageWrapper>
);
