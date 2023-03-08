import React from "react";
import { PageTitle } from "~/shared/components/PageTitle";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { Text } from "~/shared/components/Text";
import { CircularProgress } from "@mui/material";
import { usePurchasesStore } from "~stores/purchases";
import { PurchasesTable } from "~/modules/PurchasesTable";

export const Purchases: React.FC = () => {
  const { count, isLoading } = usePurchasesStore((state) => ({
    count: state.count,
    isLoading: state.isLoading
  }));

  return (
    <PageWrapper>
      <PageTitle>
        <Text className='px-4' component='p'>
          Purchases
        </Text>
        <Text className='text-gray-600' component='span'>
          count purchases
        </Text>
        &nbsp;
        {isLoading && <CircularProgress size={16} />}
        {!isLoading && <Text className='text-gray-600'>{`${count}`}</Text>}
      </PageTitle>
      <PurchasesTable />
    </PageWrapper>
  );
};
