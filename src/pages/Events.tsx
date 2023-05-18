import React from "react";
import { EventsTable } from "~/modules/EventsTable";
import { PageTableTitle } from "~/shared/components/PageTableTitle";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { useEventsStore } from "~/shared/stores/events";

export const Events: React.FC = () => {
  const { count, isLoading } = useEventsStore((state) => ({
    count: state.count,
    isLoading: state.isLoading
  }));

  return (
    <PageWrapper>
      <PageTableTitle
        title='Events'
        countTitle='count events'
        isLoading={isLoading}
        count={count}
      />
      <EventsTable />
    </PageWrapper>
  );
};
