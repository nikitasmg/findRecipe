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
import { User, useUsersQuery } from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { getEventValueHandler } from "~/shared/lib/events";
import { UsersPageCreate } from "~/shared/routes";
import { useRequestState } from "~/shared/hooks/useRequestState";
import { TablePagination } from "~/shared/components/TablePagination";
import { Panel } from "~shared/components/Panel/Panel";
import { useProjectsStore } from "~stores/projects";
import { TableActions } from "~shared/components/TableActions";
import { useColumns } from "~/modules/UsersTable/lib/useColumns";

const UsersTable: React.FC = () => {
  const {
    variables,
    title,
    activeOrder,
    pagination,
    handleTitleChange,
    handleChangePage,
    handleChangeOrder,
    resetTitle
  } = useRequestState("name");

  const client = useGraphqlClient();

  const { setCount, setLoading } = useProjectsStore((state) => ({
    setLoading: state.setLoading,
    setCount: state.setCount
  }));

  const { data, isLoading } = useUsersQuery(client, variables, {
    refetchOnMount: "always"
  });

  const users = data?.users?.data;

  const paginatorInfo = data?.users?.paginatorInfo;

  const total = paginatorInfo?.total ?? 0;

  const columns = useColumns(activeOrder, handleChangeOrder);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  useEffect(() => {
    setCount(total);
  }, [total, setCount]);

  return (
    <Panel>
      <Box className='flex flex-col gap-6 p-4'>
        <TableActions
          searchProps={{
            searchValue: title,
            searchChange: getEventValueHandler(handleTitleChange),
            resetTitle
          }}
          addButtonProps={{
            addHref: UsersPageCreate
          }}
        />

        <TableContainer>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            {!isLoading && (
              <TableBody>
                {users?.map((row: User) => {
                  return (
                    <TableRow hover role='row' tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
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

          {isLoading && (
            <Box className='flex h-[20vh] w-full justify-center items-center'>
              <CircularProgress />
            </Box>
          )}
        </TableContainer>

        {!isLoading && (
          <TablePagination
            totalPages={paginatorInfo?.lastPage ?? 1}
            page={pagination.page || 1}
            onChangePagination={handleChangePage}
          />
        )}
      </Box>
    </Panel>
  );
};

export default UsersTable;
