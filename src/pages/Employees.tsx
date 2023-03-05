import React from "react";
import { PageTitle } from "~/shared/components/PageTitle";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { Text } from "~/shared/components/Text";
import { CircularProgress } from "@mui/material";
import EmployeesTable from "~/modules/EmployeesTable/EmployeesTable";
import { useEmployeesStore } from "~stores/employees";

export const Employees: React.FC = () => {
  const { count, isLoading } = useEmployeesStore((state) => ({
    count: state.count,
    isLoading: state.isLoading
  }));

  return (
    <PageWrapper>
      <PageTitle>
        <Text className='px-4' component='p'>
          Employees
        </Text>
        <Text className='text-gray-600' component='span'>
          count employees
        </Text>
        &nbsp;
        {isLoading && <CircularProgress size={16} />}
        {!isLoading && <Text className='text-gray-600'>{`${count}`}</Text>}
      </PageTitle>
      <EmployeesTable />
    </PageWrapper>
  );
};
