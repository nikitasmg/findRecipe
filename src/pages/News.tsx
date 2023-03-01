import { CircularProgress } from "@mui/material";
import React from "react";
import { NewsTable } from "~/modules/NewsTable";
import { PageTitle } from "~/shared/components/PageTitle";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { Text } from "~/shared/components/Text";
import { useNewsStore } from "~/shared/stores/news";

export const News: React.FC = () => {
  const { count, isLoading } = useNewsStore((state) => ({
    count: state.count,
    isLoading: state.isLoading
  }));

  return (
    <PageWrapper>
      <PageTitle>
        <Text className='px-4' component='p'>
          News
        </Text>
        <Text className='text-gray-600' component='span'>
          count news
        </Text>
        &nbsp;
        {isLoading && <CircularProgress size={16} />}
        {!isLoading && <Text className='text-gray-600'>{`${count}`}</Text>}
      </PageTitle>
      <NewsTable />
    </PageWrapper>
  );
};
