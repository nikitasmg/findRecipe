import { useEffect, useState } from "react";
import { Purchase, SortOrder, usePurchasesQuery } from "~/generated/graphql";
import { useResort } from "~/api/resort";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { useRequestState } from "~shared/hooks/useRequestState";
import { usePurchasesStore } from "~stores/purchases";
import { formatDayJsForFilters } from "~/shared/lib/formatDate";
import { resortArray } from "~/shared/lib/resortArray";

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
    resetFilters,
    resetTitle
  } = useRequestState("name", {
    filterFormats: {
      created_atLike: formatDayJsForFilters
    }
  });

  const client = useGraphqlClient();

  const { data, isLoading } = usePurchasesQuery(
    client,
    {
      orderBy: [...(variables.orderBy ?? []), { column: "sort", order: SortOrder.Asc }],
      filter: variables.filter
    },
    { refetchOnMount: "always", cacheTime: 0 }
  );

  const purchases = data?.purchases;

  const { mutateAsync: resort } = useResort("upsertPurchase");

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
    onSortEnd,
    resetTitle
  };
};
