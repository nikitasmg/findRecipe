import { useEffect, useState } from "react";
import { SortOrder, useVideoBroadcastsQuery, VideoBroadcast } from "~/generated/graphql";
import { useResort } from "~/api/resort";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { useRequestState } from "~shared/hooks/useRequestState";
import { formatDayJsForFilters } from "~/shared/lib/formatDate";
import { resortArray } from "~/shared/lib/resortArray";
import { useBroadcastsStore } from "~stores/broadcasts";

export const useBroadcasts = () => {
  const [rows, setRows] = useState<VideoBroadcast[]>([]);

  const { setCount, setLoading } = useBroadcastsStore((state) => ({
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
  } = useRequestState("name", {
    filterFormats: {
      created_atLike: formatDayJsForFilters
    }
  });

  const client = useGraphqlClient();

  const { data, isLoading } = useVideoBroadcastsQuery(
    client,
    {
      orderBy: [...(variables.orderBy ?? []), { column: "sort", order: SortOrder.Asc }],
      filter: variables.filter
    },
    { refetchOnMount: "always", cacheTime: 0 }
  );

  const broadcasts = data?.videoBroadcasts;

  const { mutateAsync: resort } = useResort("upsertVideoBroadcast");

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
    setCount(broadcasts?.length ?? 0);
  }, [broadcasts, setCount]);

  useEffect(() => {
    setRows(broadcasts as VideoBroadcast[]);
  }, [broadcasts]);

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
    broadcasts
  };
};
