import React from "react";
import { NewsTable } from "~/modules/NewsTable";
import { PageTableTitle } from "~/shared/components/PageTableTitle";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { useNewsStore } from "~/shared/stores/news";

export const News: React.FC = () => {
  const { count, isLoading } = useNewsStore((state) => ({
    count: state.count,
    isLoading: state.isLoading
  }));

  return (
    <PageWrapper>
      <PageTableTitle title='Pages' countTitle='count pages' isLoading={isLoading} count={count} />
      <NewsTable />
    </PageWrapper>
  );
};
