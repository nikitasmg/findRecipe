import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DeepPartial } from "react-hook-form";
import { MapObject, useMapObjectsQuery } from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { TableActions } from "~/shared/components/TableActions";
import { InteractiveMap as Map } from "~/shared/components/InteractiveMap";
import { getEventValueHandler } from "~/shared/lib/events";
import { formatDayJsForFilters } from "~/shared/lib/formatDate";
import { useRequestState } from "~/shared/hooks/useRequestState";
import { InteractiveMapPageEdit } from "~/shared/routes";
import { FiltersForm } from "./components/FiltersForm";
import { useColumns } from "./lib/useColumns";
import { ItemsGroups } from "./types";
import { EmptyView } from "~/shared/components/EmptyView";
import { useInteractiveMapStore } from "~stores/interactiveMap";

export const InteractiveMap: React.FC = () => {
  const history = useNavigate();

  const { setCount, setLoading } = useInteractiveMapStore((state) => ({
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

  const handleSelect = (id: string) => {
    if (!(id in ItemsGroups)) {
      return;
    }

    const objectId = ItemsGroups[id as keyof typeof ItemsGroups];

    history(InteractiveMapPageEdit.replace(":id", String(objectId)));
  };

  const client = useGraphqlClient();

  const { data, isLoading } = useMapObjectsQuery(client, variables);

  const mapObjects = data?.mapObjects;

  const columns = useColumns(activeOrder, handleChangeOrder);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  useEffect(() => {
    setCount(mapObjects?.length ?? 0);
  }, [mapObjects, setCount]);

  return (
    <Box className='flex flex-col gap-6' component='form'>
      <Box className='w-full flex justify-center border rounded-lg mb-4'>
        <Box className='w-full h-fit'>
          <Map onSelect={handleSelect} />
        </Box>
      </Box>

      <Box className='flex flex-col gap-6'>
        <TableActions
          searchProps={{
            searchValue: title,
            searchChange: getEventValueHandler(handleTitleChange),
            resetTitle
          }}
          resetFilters={resetFilters}
          filterModalInnerForm={
            <FiltersForm params={params} handleChangeFilter={handleFilterChange} />
          }
        />

        <TableContainer>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align} style={column.style}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            {!isLoading && (
              <TableBody>
                {mapObjects?.map((row: DeepPartial<MapObject>) => {
                  return (
                    <TableRow hover role='row' tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={column.style}
                            className={column.className}
                          >
                            {column.render?.(value, row as MapObject) ?? value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            )}
          </Table>

          {!mapObjects?.length && !isLoading && <EmptyView />}

          {isLoading && (
            <Box className='flex h-[20vh] w-full justify-center items-center'>
              <CircularProgress />
            </Box>
          )}
        </TableContainer>
      </Box>
    </Box>
  );
};
