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
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import React, { Fragment, useEffect } from "react";
import { News, useNewsQuery } from "~/generated/graphql";
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
  onNewsCountChange?: (count: number) => void;
};

export const NewsTable: React.FC<Props> = ({ onNewsCountChange }) => {
  const {
    variables,
    title,
    params,
    activeOrder,
    pagination,
    handleTitleChange,
    handleChangePage,
    handleChangeRowsPerPage,
    handleChangeOrder,
    handleFilterChange
  } = useRequestState("name");

  const client = useGraphqlClient();

  const { data, isLoading } = useNewsQuery(client, variables);

  const news = data?.news;

  const total = news?.paginatorInfo.total ?? 0;

  const columns = getColumns(activeOrder, params, handleChangeOrder, handleFilterChange);

  useEffect(() => {
    onNewsCountChange?.(total);
  }, [total, onNewsCountChange]);

  return (
    <Panel>
      <Box className='flex items-stretch gap-2 p-4 flex-col sm:flex-row'>
        <SearchInput
          label={<Text>Fast search</Text>}
          fullWidth
          value={title}
          onChange={getEventValueHandler(handleTitleChange)}
          size='small'
        />

        <LinkButton variant='outlined' href={NewsPageEdit} className='!capitalize'>
          <AddBoxRoundedIcon />
          <Text>Add</Text>
        </LinkButton>
      </Box>

      <Fragment>
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
                {news?.data?.map((row: News) => {
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
          totalPages={news?.paginatorInfo.lastPage ?? 1}
          page={pagination.page || 1}
          perPage={pagination.perPage}
          onChangePagination={handleChangePage}
          onChangePerPage={handleChangeRowsPerPage}
        />
      </Fragment>
    </Panel>
  );
};
