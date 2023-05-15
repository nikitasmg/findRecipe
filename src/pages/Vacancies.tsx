import React from "react";
import { PageWrapper } from "~/shared/components/PageWrapper";
import { VacanciesTable } from "~/modules/VacanciesTable";
import { useVacanciesStore } from "~stores/vacancies";
import { PageTableTitle } from "~shared/components/PageTableTitle";

export const Vacancies: React.FC = () => {
  const { count, isLoading } = useVacanciesStore((state) => ({
    count: state.count,
    isLoading: state.isLoading
  }));

  return (
    <PageWrapper>
      <PageTableTitle
        title='Vacancies'
        isLoading={isLoading}
        count={count}
        sitePath='about/staff'
      />
      <VacanciesTable />
    </PageWrapper>
  );
};
