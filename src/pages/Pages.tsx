import React from "react";
import { PagesTable } from "~/modules/PagesTable";
import { PageTableTitle } from "~/shared/components/PageTableTitle";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { usePagesStore } from "~/shared/stores/pages";

export const Pages: React.FC = () => {
  const { count, isLoading } = usePagesStore((state) => ({
    count: state.count,
    isLoading: state.isLoading
  }));

  return (
    <PageWrapper>
      <PageTableTitle title='Pages' isLoading={isLoading} count={count} />
      <PagesTable />
    </PageWrapper>
  );
};
