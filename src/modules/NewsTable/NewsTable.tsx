import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { News } from "~/api/generated/graphql";
import { useFetchNews } from "~/api/news";
import { Text } from "~/shared/components/Text";
import { useTablePagination } from "~/shared/hooks/useTablePagination";
import { getColumns } from "./lib/getColumns";
import { ActiveOrder } from "./types";
import { getEventValueHandler } from "~/shared/lib/events";
import { debounce } from "~/shared/lib/debounce";

export const NewsTable: React.FC = () => {
  const [activeOrder, setActiveOrder] = useState<ActiveOrder>(null);
  const [filter, setFilter] = useState<Record<string, string> | null>(null);
  const [title, setTitle] = useState<string>("");

  const { pagination, handleChangePage, handleChangeRowsPerPage, resetPagination } =
    useTablePagination();

  const { mutateAsync: fetchNews, data, isLoading } = useFetchNews();

  const news = data?.news;

  const handleChangeOrder = (order: ActiveOrder) => {
    setActiveOrder(order);
    resetPagination();
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearchTitle = useCallback(
    debounce<[string]>((newTitle: string) => {
      setFilter((filter) => ({ ...filter, name: newTitle }));
      resetPagination();
    }, 300),
    [resetPagination]
  );

  const handleTitleChange = (newTitle: string) => {
    handleSearchTitle(newTitle);
    setTitle(newTitle);
  };

  const columns = getColumns(activeOrder, handleChangeOrder);

  useEffect(() => {
    fetchNews({
      page: pagination.page + 1,
      first: pagination.perPage,
      ...(activeOrder
        ? {
            orderBy: [{ column: activeOrder.name, order: activeOrder.direction }]
          }
        : {}),
      ...(filter
        ? {
            filter: Object.entries(filter).map(([key, value]) => ({ column: key, value }))
          }
        : {})
    });
  }, [pagination, fetchNews, activeOrder, filter]);

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
        <Paper elevation={5} className='rounded'>
          <Box className='flex items-stretch gap-2 p-4'>
            <TextField
              label={<Text>Fast search</Text>}
              fullWidth
              value={title}
              onChange={getEventValueHandler(handleTitleChange)}
              size='small'
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton>
                      <SearchRoundedIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            <Button variant='outlined' className='!capitalize'>
              <AddBoxRoundedIcon />
              <Text>Add</Text>
            </Button>
          </Box>

          {isLoading && (
            <Box className='flex h-[20vh] w-full justify-center items-center'>
              <CircularProgress />
            </Box>
          )}
          {!isLoading && (
            <Fragment>
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
            </Fragment>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};
