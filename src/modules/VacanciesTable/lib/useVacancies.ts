import { curry } from "rambda";
import {
  UpdateVacancyMutationVariables,
  useUpdateVacancyMutation,
  useVacanciesQuery,
  Vacancy
} from "~/generated/graphql";
import { useEffect, useState } from "react";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { useVacanciesStore } from "~stores/vacancies";
import { useRequestState } from "~shared/hooks/useRequestState";
import { arrayMove } from "react-sortable-hoc";

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
    resetFilters
  } = useRequestState("name");

  const client = useGraphqlClient();

  const { data, isLoading } = useVacanciesQuery(
    client,
    { orderBy: variables.orderBy, filter: variables.filter },
    { refetchOnMount: "always" }
  );

  const vacancies = data?.vacancies;

  const { mutateAsync: updateVacancy } = useUpdateVacancyMutation(client);

  const getUpdatedRows = curry((id: string, newValues: Vacancy, rows: Vacancy[]) =>
    rows.reduce((res: Vacancy[], row) => {
      if (row.id === id) {
        return res.concat({ ...row, ...newValues });
      }

      return res.concat(row);
    }, [])
  );

  const update = (args: UpdateVacancyMutationVariables) => {
    updateVacancy(args).then((data) => {
      const newItem = data["upsertVacancy"] as Vacancy;

      setRows(getUpdatedRows(newItem.id, newItem));
    });
  };

  const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
    update({ input: { ...rows[oldIndex], sort: newIndex } });

    setRows((rows) => arrayMove(rows, oldIndex, newIndex));
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
    onSortEnd
  };
};
