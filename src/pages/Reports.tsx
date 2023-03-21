import React from "react";
import { PageTableTitle } from "~/shared/components/PageTableTitle";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { useReportsStore } from "~stores/reports";
import { ReportsTable } from "~/modules/ReportsTable";

export const Reports: React.FC = () => {
  const { count, isLoading } = useReportsStore((state) => ({
    count: state.count,
    isLoading: state.isLoading
  }));

  return (
    <PageWrapper>
      <PageTableTitle
        title='Reports'
        countTitle='count reports'
        isLoading={isLoading}
        count={count}
      />
      <ReportsTable />
    </PageWrapper>
  );
};
