import { useEffect, useState } from "react";
import { useResort } from "~/api/resort";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { SortOrder, StcPhotoGallery, useStcPhotoGalleriesQuery } from "~/generated/graphql";
import { useRequestState } from "~/shared/hooks/useRequestState";
import { formatDayJsForFilters } from "~/shared/lib/formatDate";
import { resortArray } from "~/shared/lib/resortArray";

export const useStcPhotoGallery = () => {
    const [rows, setRows] = useState<StcPhotoGallery[]>([]);
  
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
  
    const { data, isLoading } = useStcPhotoGalleriesQuery(
      client,
      {
        orderBy: [...(variables.orderBy ?? []), { column: "sort", order: SortOrder.Asc }],
        filter: variables.filter
      },
      { refetchOnMount: "always", cacheTime: 0 }
    );
  
    const StcPhotoGallery = data?.stcPhotoGalleries;
  
    const { mutateAsync: resort } = useResort("upsertStcPhotoGallery");
  
    const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
      setRows((rows) => {
        const newRows = resortArray(oldIndex, newIndex, rows);
  
        resort(newRows.slice(0, Math.max(newIndex, oldIndex) + 1));
  
        return newRows;
      });
    };
  
    useEffect(() => {
      setRows(StcPhotoGallery as StcPhotoGallery[]);
    }, [StcPhotoGallery]);
  
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
  