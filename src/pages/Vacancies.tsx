import React from "react";
import { PageTitle } from "~/shared/components/PageTitle";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { Text } from "~/shared/components/Text";
import { CircularProgress } from "@mui/material";
import { VacanciesTable } from "~/modules/VacanciesTable";
import { useVacanciesStore } from "~stores/vacancies";

export const Vacancies: React.FC = () => {
  const { count, isLoading } = useVacanciesStore((state) => ({
    count: state.count,
    isLoading: state.isLoading
  }));

  return (
    <PageWrapper>
      <PageTitle>
        <Text className='px-4' component='p'>
          Vacancies
        </Text>
        <Text className='text-secondaryText' component='span'>
          count vacancies
        </Text>
        &nbsp;
        {isLoading && <CircularProgress size={16} />}
        {!isLoading && <Text className='text-secondaryText'>{`${count}`}</Text>}
      </PageTitle>
      <VacanciesTable />
    </PageWrapper>
  );
};
