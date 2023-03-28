import React from "react";
import { ClustersTable } from "~/modules/ClustersTable";
import { PageTitle } from "~/shared/components/PageTitle";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { Text } from "~/shared/components/Text";

export const Clusters: React.FC = () => {
  return (
    <PageWrapper>
      <PageTitle>
        <Text component='p'>Clusters</Text>
      </PageTitle>
      <ClustersTable />
    </PageWrapper>
  );
};
