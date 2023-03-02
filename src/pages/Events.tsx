import { CircularProgress } from "@mui/material";
import React from "react";
import { PageTitle } from "~/shared/components/PageTitle";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { Text } from "~/shared/components/Text";
import { useEventsStore } from "~/shared/stores/events";

export const Events: React.FC = () => {
  const { count, isLoading } = useEventsStore((state) => ({
    count: state.count,
    isLoading: state.isLoading
  }));

  return (
    <PageWrapper>
      <PageTitle>
        <Text className='px-4' component='p'>
          Events
        </Text>
        <Text className='text-gray-600' component='span'>
          count events
        </Text>
        &nbsp;
        {isLoading && <CircularProgress size={16} />}
        {!isLoading && <Text className='text-gray-600'>{`${count}`}</Text>}
      </PageTitle>
    </PageWrapper>
  );
};
