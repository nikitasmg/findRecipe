import React from "react";
import { ClustersTable } from "~/modules/ClustersTable";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { PageTableTitle } from "~shared/components/PageTableTitle";
import { useClustersStore } from "~stores/clusters";

export const Clusters: React.FC = () => {
  const { count, isLoading } = useClustersStore((state) => ({
    count: state.count,
    isLoading: state.isLoading
  }));

  return (
    <PageWrapper>
      <PageTableTitle
        title='Clusters'
        sitePath='ntc-in-surgut'
        count={count}
        isLoading={isLoading}
      />
      <ClustersTable />
    </PageWrapper>
  );
};
