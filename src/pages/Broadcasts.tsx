import React from "react";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { BroadcastsTable } from "~/modules/BroadcastsTable";
import { PageTableTitle } from "~shared/components/PageTableTitle";
import { useBroadcastsStore } from "~stores/broadcasts";

export const Broadcasts: React.FC = () => {
  const { count, isLoading } = useBroadcastsStore((state) => ({
    count: state.count,
    isLoading: state.isLoading
  }));

  return (
    <PageWrapper>
      <PageTableTitle
        title='Video broadcasts'
        sitePath='ntc-in-surgut'
        count={count}
        isLoading={isLoading}
      />
      <BroadcastsTable />
    </PageWrapper>
  );
};
