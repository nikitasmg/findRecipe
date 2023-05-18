import { useEffect, useState } from "react";
import { SortOrder, useVacanciesQuery, Vacancy } from "~/generated/graphql";
import { useResort } from "~/api/resort";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { useVacanciesStore } from "~stores/vacancies";
import { useRequestState } from "~shared/hooks/useRequestState";
import { resortArray } from "~/shared/lib/resortArray";

export const useVacancies = () => {
  const [rows, setRows] = useState<Vacancy[]>([]);

  const { setCount, setLoading } = useVacanciesStore((state) => ({
    setLoading: state.setLoading,
    setCount: state.setCount
  }));

  const {
    variables,
    title,
    params,
    activeOrder,
    handleTitleChange,
    handleChangeOrder,
    handleFilterChange,
    resetFilters,
    resetTitle
  } = useRequestState("name");

  const client = useGraphqlClient();

  const { data, isLoading } = useVacanciesQuery(
    client,
    {
      orderBy: [...(variables.orderBy ?? []), { column: "sort", order: SortOrder.Asc }],
      filter: variables.filter
    },
    { refetchOnMount: "always" }
  );

  const vacancies = data?.vacancies;

  const { mutateAsync: resort } = useResort("upsertVacancy");

  const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
    setRows((rows) => {
      const newRows = resortArray(oldIndex, newIndex, rows);

      resort(newRows.slice(0, Math.max(newIndex, oldIndex) + 1));

      return newRows;
    });
  };

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  useEffect(() => {
    setCount(vacancies?.length ?? 0);
  }, [vacancies, setCount]);

  useEffect(() => {
    setRows(vacancies as Vacancy[]);
  }, [vacancies]);

  return {
    title,
    params,
    activeOrder,
    handleTitleChange,
    handleChangeOrder,
    handleFilterChange,
    resetFilters,
    isLoading,
    rows,
    onSortEnd,
    resetTitle
  };
};
