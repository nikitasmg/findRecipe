import { curry } from "rambda";
import {
  Employee,
  UpdateEmployeeMutationVariables,
  useEmployeesQuery,
  useSubdivisionsQuery,
  useUpdateEmployeeMutation
} from "~/generated/graphql";
import { useEffect, useState } from "react";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { useRequestState } from "~shared/hooks/useRequestState";
import { arrayMove } from "react-sortable-hoc";
import { useEmployeesStore } from "~stores/employees";

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
    resetFilters
  } = useRequestState("name");

  const client = useGraphqlClient();

  const { data: subdivisionsData } = useSubdivisionsQuery(client);

  const { data, isLoading } = useEmployeesQuery(
    client,
    { orderBy: variables.orderBy, filter: variables.filter },
    { refetchOnMount: "always" }
  );

  const subdivisions = subdivisionsData?.subdivisions;

  const employees = data?.employees;

  const { mutateAsync: updateEmployee } = useUpdateEmployeeMutation(client);

  const getUpdatedRows = curry((id: string, newValues: Employee, rows: Employee[]) =>
    rows.reduce((res: Employee[], row) => {
      if (row.id === Number(id)) {
        return res.concat({ ...row, ...newValues });
      }

      return res.concat(row);
    }, [])
  );

  const update = (args: UpdateEmployeeMutationVariables) => {
    updateEmployee(args).then((data) => {
      const newItem = data["upsertEmployee"] as Employee;

      setRows(getUpdatedRows(newItem.id, newItem));
    });
  };

  const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
    const oldRow = rows[oldIndex];
    update({
      input: {
        id: oldRow.id,
        name: oldRow.name,
        position: oldRow.position,
        additional: oldRow.additional,
        email: oldRow.email,
        sort: newIndex,
        subdivision: { connect: rows[oldIndex].subdivision?.id }
      }
    });

    setRows((rows) => arrayMove(rows, oldIndex, newIndex));
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
    subdivisions
  };
};
