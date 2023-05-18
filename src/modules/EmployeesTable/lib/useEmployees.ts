import { Employee, SortOrder, useEmployeesQuery, useSubdivisionsQuery } from "~/generated/graphql";
import { useResort } from "~/api/resort";
import { useEffect, useState } from "react";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { useRequestState } from "~shared/hooks/useRequestState";
import { useEmployeesStore } from "~stores/employees";
import { resortArray } from "~/shared/lib/resortArray";

export const useEmployees = () => {
  const [rows, setRows] = useState<Employee[]>([]);

  const { setCount, setLoading } = useEmployeesStore((state) => ({
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

  const { data: subdivisionsData } = useSubdivisionsQuery(client);

  const { data, isLoading } = useEmployeesQuery(
    client,
    {
      ...variables,
      orderBy: [...(variables.orderBy ?? []), { column: "sort", order: SortOrder.Asc }]
    },
    { refetchOnMount: "always" }
  );

  const subdivisions = subdivisionsData?.subdivisions;

  const employees = data?.employees;

  const { mutateAsync: resort } = useResort("upsertEmployee");

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
    setCount(employees?.length ?? 0);
  }, [employees, setCount]);

  useEffect(() => {
    setRows(employees as Employee[]);
  }, [employees]);

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
    subdivisions,
    resetTitle
  };
};
