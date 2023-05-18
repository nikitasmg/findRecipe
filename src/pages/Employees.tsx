import React from "react";
import { PageWrapper } from "~/shared/components/PageWrapper";
import EmployeesTable from "~/modules/EmployeesTable/EmployeesTable";
import { useEmployeesStore } from "~stores/employees";
import { PageTableTitle } from "~shared/components/PageTableTitle";

export const Employees: React.FC = () => {
  const { count, isLoading } = useEmployeesStore((state) => ({
    count: state.count,
    isLoading: state.isLoading
  }));

  return (
    <PageWrapper>
      <PageTableTitle
        title='Employees'
        isLoading={isLoading}
        count={count}
        sitePath='about/staff'
      />
      <EmployeesTable />
    </PageWrapper>
  );
};
