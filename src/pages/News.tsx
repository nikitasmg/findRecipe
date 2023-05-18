import React from "react";
import { PageTableTitle } from "~/shared/components/PageTableTitle";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { useNewsStore } from "~/shared/stores/news";
import { NewsTable } from "~/modules/NewsTable/NewsTable";

export const News: React.FC = () => {
  const { count, isLoading } = useNewsStore((state) => ({
    count: state.count,
    isLoading: state.isLoading
  }));

  return (
    <PageWrapper>
      <PageTableTitle title='News' countTitle='count news' isLoading={isLoading} count={count} />
      <NewsTable />
    </PageWrapper>
  );
};
