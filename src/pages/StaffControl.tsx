import React from "react";
import { StaffControlTabs } from "~/layouts/StaffControlTabs";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { PageTableTitle } from "~shared/components/PageTableTitle";
import { TableWrapper } from "~shared/components/TableWrapper";
import { useStaffControlStore } from "~stores/staffControl";

export const StaffControl: React.FC = () => {
  const { count, isLoading } = useStaffControlStore((state) => ({
    count: state.count,
    isLoading: state.isLoading
  }));

  return (
    <PageWrapper>
      <PageTableTitle
        title='Staff control'
        sitePath='about/control'
        count={count}
        isLoading={isLoading}
      />
      <TableWrapper>
        <StaffControlTabs />
      </TableWrapper>
    </PageWrapper>
  );
};
