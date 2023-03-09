import { curry } from "rambda";
import {
  Purchase,
  UpdatePurchaseMutationVariables,
  usePurchasesQuery,
  useUpdatePurchaseMutation
} from "~/generated/graphql";
import { useEffect, useState } from "react";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { useRequestState } from "~shared/hooks/useRequestState";
import { arrayMove } from "react-sortable-hoc";
import { usePurchasesStore } from "~stores/purchases";

export const usePurchases = () => {
  const [rows, setRows] = useState<Purchase[]>([]);

  const { setCount, setLoading } = usePurchasesStore((state) => ({
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

  const { data, isLoading } = usePurchasesQuery(
    client,
    { orderBy: variables.orderBy, filter: variables.filter },
    { refetchOnMount: "always" }
  );

  const purchases = data?.purchases;

  const { mutateAsync: updatePurchase } = useUpdatePurchaseMutation(client);

  const getUpdatedRows = curry((id: string, newValues: Purchase, rows: Purchase[]) =>
    rows.reduce((res: Purchase[], row) => {
      if (row.id === id) {
        return res.concat({ ...row, ...newValues });
      }

      return res.concat(row);
    }, [])
  );

  const update = (args: UpdatePurchaseMutationVariables) => {
    updatePurchase(args).then((data) => {
      const newItem = data["upsertPurchase"] as Purchase;

      setRows(getUpdatedRows(newItem.id, newItem));
    });
  };

  const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
    const oldRow = rows[oldIndex];

    update({
      input: {
        id: oldRow.id,
        name: oldRow.name,
        description: oldRow.description,
        url: oldRow.url,
        sort: newIndex,
        published: oldRow.published
      }
    });

    setRows((rows) => arrayMove(rows, oldIndex, newIndex));
  };

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  useEffect(() => {
    setCount(purchases?.length ?? 0);
  }, [purchases, setCount]);

  useEffect(() => {
    setRows(purchases as Purchase[]);
  }, [purchases]);

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