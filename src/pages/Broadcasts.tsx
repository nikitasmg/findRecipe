import React from "react";
import { PageTitle } from "~/shared/components/PageTitle";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { Text } from "~/shared/components/Text";
import { BroadcastsTable } from "~/modules/BroadcastsTable";

export const Broadcasts: React.FC = () => {
  

  return (
    <PageWrapper>
      <PageTitle>
        <Text className='px-4' component='p'>
          Video broadcasts
        </Text>
      </PageTitle>
      <BroadcastsTable />
    </PageWrapper>
  );
};