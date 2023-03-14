import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import React, { Fragment, useEffect } from "react";
import { User, useUsersQuery } from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { getEventValueHandler } from "~/shared/lib/events";
import { NewsPageEdit } from "~/shared/routes";
import { useRequestState } from "~/shared/hooks/useRequestState";
import { LinkButton } from "~/shared/components/LinkButton";
import { Text } from "~/shared/components/Text";
import { TablePagination } from "~/shared/components/TablePagination";
import { SearchInput } from "~/shared/components/SearchInput";
import { Panel } from "~shared/components/Panel/Panel";
import { getColumns } from "./lib/getColumns";

type Props = {
  onUsersCountChange?: (count: number) => void;
};

export const UsersTable: React.FC<Props> = ({ onUsersCountChange }) => {
  const { variables, title, pagination, handleTitleChange, handleChangePage, resetTitle } =
    useRequestState("name");

  const client = useGraphqlClient();

  const { data, isLoading } = useUsersQuery(client, {
    ...variables
  });

  const users = data?.users;

  const total = users?.paginatorInfo.total ?? 0;

  const columns = getColumns();

  useEffect(() => {
    onUsersCountChange?.(total);
  }, [total, onUsersCountChange]);

  return (
    <Panel>
      <Box className='flex items-stretch gap-2 p-4 flex-col sm:flex-row'>
        <SearchInput
          label={<Text>Fast search</Text>}
          fullWidth
          value={title}
          onChange={getEventValueHandler(handleTitleChange)}
          handleReset={resetTitle}
        />

        <LinkButton disabled variant='outlined' href={NewsPageEdit} className='!capitalize'>
          <AddBoxRoundedIcon />
          <Text>Add</Text>
        </LinkButton>
      </Box>

      <Fragment>
        <TableContainer component={Paper}>
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
                {users?.data?.map((row: Partial<User>) => {
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

        <TablePagination
          totalPages={users?.paginatorInfo.lastPage ?? 1}
          page={pagination.page || 1}
          onChangePagination={handleChangePage}
        />
      </Fragment>
    </Panel>
  );
};
