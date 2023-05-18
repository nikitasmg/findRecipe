import { useEffect, useState } from "react";
import { SortOrder, useClustersQuery, Cluster } from "~/generated/graphql";
import { useResort } from "~/api/resort";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { useRequestState } from "~shared/hooks/useRequestState";
import { resortArray } from "~/shared/lib/resortArray";
import { useClustersStore } from "~stores/clusters";

export const useClusters = () => {
  const [rows, setRows] = useState<Cluster[]>([]);

  const { setCount, setLoading } = useClustersStore((state) => ({
    setLoading: state.setLoading,
    setCount: state.setCount
  }));

  const {
    variables,
    title,
    params,
    activeOrder,
    handleChangeOrder,
    handleFilterChange,
    resetFilters,
    resetTitle,
    setTitle,
    handleSearchTitle
  } = useRequestState("name");

  const client = useGraphqlClient();

  const { data, isLoading } = useClustersQuery(
    client,
    {
      orderBy: [...(variables.orderBy ?? []), { column: "sort", order: SortOrder.Asc }],
      filter: variables.filter
    },
    { refetchOnMount: "always", cacheTime: 0 }
  );

  const clusters = data?.clusters;

  const { mutateAsync: resort } = useResort("upsertCluster");

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
    setCount(clusters?.length ?? 0);
  }, [clusters, setCount]);

  useEffect(() => {
    setRows(clusters ?? []);
  }, [clusters]);

  return {
    title,
    params,
    activeOrder,
    handleChangeOrder,
    handleFilterChange,
    resetFilters,
    isLoading,
    rows,
    onSortEnd,
    resetTitle,
    setTitle,
    handleSearchTitle,
    clusters
  };
};
