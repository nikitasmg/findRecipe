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
import { Project, useProjectsQuery } from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { getEventValueHandler } from "~/shared/lib/events";
import { ProjectsPageCreate } from "~/shared/routes";
import { useRequestState } from "~/shared/hooks/useRequestState";
import { TablePagination } from "~/shared/components/TablePagination";
import { TableActions } from "~/shared/components/TableActions";
import { useColumns } from "./lib/useColumns";
import { FiltersForm } from "./components/FiltersForm";
import { useProjectsStore } from "~stores/projects";
import { getCurrentQueryVariables } from "~/modules/ProjectsTable/lib/getCurrentQueryVariables";
import { TableWrapper } from "~shared/components/TableWrapper";
import { EmptyView } from "~shared/components/EmptyView";

export const ProjectsTable: React.FC = () => {
  const {
    variables,
    title,
    params,
    activeOrder,
    pagination,
    handleTitleChange,
    handleChangePage,
    handleChangeOrder,
    handleFilterChange,
    resetFilters,
    resetTitle,
    removeFilter,
    handleSubmit
  } = useRequestState("name");

  const client = useGraphqlClient();

  const { setCount, setLoading } = useProjectsStore((state) => ({
    setLoading: state.setLoading,
    setCount: state.setCount
  }));

  const { data, isLoading } = useProjectsQuery(client, getCurrentQueryVariables(variables), {
    refetchOnMount: "always"
  });

  const projects = data?.projects;

  const total = projects?.paginatorInfo.total ?? 0;

  const columns = useColumns(activeOrder, handleChangeOrder);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  useEffect(() => {
    setCount(total);
  }, [total, setCount]);

  return (
    <TableWrapper>
      <TableActions
        searchProps={{
          searchValue: title,
          searchChange: getEventValueHandler(handleTitleChange),
          resetTitle
        }}
        addButtonProps={{
          addHref: ProjectsPageCreate
        }}
        resetFilters={resetFilters}
        filters={params}
        removeFilter={removeFilter}
        handleSubmit={handleSubmit}
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
              {projects?.data?.map((row: Project) => {
                return (
                  <TableRow hover role='row' tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          className={column.className}
                        >
                          {column.render?.(value, row) ?? column.format?.(value) ?? value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          )}
        </Table>

        {!projects?.data.length && !isLoading && <EmptyView />}

        {isLoading && (
          <Box className='flex h-[20vh] w-full justify-center items-center'>
            <CircularProgress />
          </Box>
        )}
      </TableContainer>

      {!isLoading && (
        <TablePagination
          totalPages={projects?.paginatorInfo.lastPage ?? 1}
          page={pagination.page || 1}
          onChangePagination={handleChangePage}
        />
      )}
    </TableWrapper>
  );
};
