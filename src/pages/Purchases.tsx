import React from "react";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { usePurchasesStore } from "~stores/purchases";
import { PurchasesTable } from "~/modules/PurchasesTable";
import { PageTableTitle } from "~shared/components/PageTableTitle";

export const Purchases: React.FC = () => {
  const { count, isLoading } = usePurchasesStore((state) => ({
    count: state.count,
    isLoading: state.isLoading
  }));

  return (
    <PageWrapper>
      <PageTableTitle
        title='Purchases'
        isLoading={isLoading}
        count={count}
        sitePath='about/orders'
      />
      <PurchasesTable />
    </PageWrapper>
  );
};
