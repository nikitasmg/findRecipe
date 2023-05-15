import React from "react";
import { PageTableTitle } from "~/shared/components/PageTableTitle";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { useActivityResultsStore } from "~stores/activityResult";
import { ActivityResultsTable } from "~/modules/ActivityResultsTable";

export const ActivityResult: React.FC = () => {
  const { count, isLoading } = useActivityResultsStore((state) => ({
    count: state.count,
    isLoading: state.isLoading
  }));

  return (
    <PageWrapper>
      <PageTableTitle
        title='Activity results'
        isLoading={isLoading}
        count={count}
        sitePath='about/result'
      />
      <ActivityResultsTable />
    </PageWrapper>
  );
};
