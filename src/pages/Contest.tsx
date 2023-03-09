import React from "react";
import { ContestTable } from "~/modules/ContestTable";
import { PageTableTitle } from "~/shared/components/PageTableTitle";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { useContestStore } from "~/shared/stores/contest";

export const Contest: React.FC = () => {
  const { count, isLoading } = useContestStore((state) => ({
    count: state.count,
    isLoading: state.isLoading
  }));

  return (
    <PageWrapper>
      <PageTableTitle
        title='Contests'
        countTitle='count contests'
        isLoading={isLoading}
        count={count}
      />
      <ContestTable />
    </PageWrapper>
  );
};
