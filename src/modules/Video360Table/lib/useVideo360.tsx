import { useEffect, useState } from "react";
import { SortOrder, Video360, useVideo360Query } from "~/generated/graphql";
import { useResort } from "~/api/resort";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { useRequestState } from "~shared/hooks/useRequestState";
import { formatDayJsForFilters } from "~/shared/lib/formatDate";
import { resortArray } from "~/shared/lib/resortArray";
import { useVideo360Store } from "~stores/video360";

export const useVideo360 = () => {
  const [rows, setRows] = useState<Video360[]>([]);

  const { setCount, setLoading } = useVideo360Store((state) => ({
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

  const { data, isLoading } = useVideo360Query(
    client,
    {
      orderBy: [...(variables.orderBy ?? []), { column: "sort", order: SortOrder.Asc }],
      filter: variables.filter
    },
    { refetchOnMount: "always", cacheTime: 0 }
  );

  const video360 = data?.video360;

  const { mutateAsync: resort } = useResort("upsertVideo360");

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
    setCount(video360?.length ?? 0);
  }, [video360, setCount]);

  useEffect(() => {
    setRows(video360 as Video360[]);
  }, [video360]);

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
