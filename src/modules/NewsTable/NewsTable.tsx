import {
  Box,
  CircularProgress,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { News } from "~/api/generated/graphql";
import { useFetchNews } from "~/api/news";
import { Text } from "~/shared/components/Text";
import { useTablePagination } from "~/shared/hooks/useTablePagination";
import { getColumns } from "./lib/getColumns";
import { ActiveOrder } from "./types";

export const NewsTable: React.FC = () => {
  const [activeOrder, setActiveOrder] = useState<ActiveOrder>(null);

  const { pagination, handleChangePage, handleChangeRowsPerPage, resetPagination } =
    useTablePagination();

  const { mutateAsync: fetchNews, data, isLoading } = useFetchNews();

  const news = data?.news;

  useEffect(() => {
    fetchNews({
      page: pagination.page + 1,
      first: pagination.perPage,
      ...(activeOrder
        ? {
            orderBy: [{ column: activeOrder.name, order: activeOrder.direction }]
          }
        : {})
    });
  }, [pagination, fetchNews, activeOrder]);

  const handleChangeOrder = (order: ActiveOrder) => {
    setActiveOrder(order);
    resetPagination();
  };

  const columns = getColumns(activeOrder, handleChangeOrder);

  return (
    <Grid container>
      <Grid item columns={12} xs={12}>
        <Box className='flex p-2 border drop-shadow-md'>
          <Text className='px-4' component='p'>
            News
          </Text>
          <Text className='text-gray-400' component='span'>
            count news
          </Text>
          &nbsp;
          <Text className='text-gray-400'>{`${news?.paginatorInfo.total ?? 0}`}</Text>
        </Box>
      </Grid>
      <Grid item columns={12} xs={12} className='p-6'>
        {isLoading && (
          <Box className='flex h-[20vh] w-full justify-center items-center'>
            <CircularProgress />
          </Box>
        )}

        {!isLoading && (
          <Paper elevation={5} className='rounded'>
            <TableContainer className='max-h-[400px]'>
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
                <TableBody>
                  {news?.data?.map((row: News) => {
                    return (
                      <TableRow hover role='row' tabIndex={-1} key={row.id}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format?.(value) ?? value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              labelRowsPerPage={<Text>Rows per page:</Text>}
              rowsPerPageOptions={[10, 30, 100]}
              component='div'
              count={news?.paginatorInfo.total ?? 0}
              rowsPerPage={pagination.perPage}
              page={pagination.page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        )}
      </Grid>
    </Grid>
  );
};
