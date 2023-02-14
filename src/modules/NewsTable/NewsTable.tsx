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
  TableRow,
  TableSortLabel
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { News, NewsPaginator, SortOrder } from "~/api/generated/graphql";
import { useFetchNews } from "~/api/news";
import { Text } from "~/shared/components/Text";

interface Column {
  id: keyof NewsPaginator["data"][0];
  label: JSX.Element | string;
  minWidth?: number;
  align?: "right";
  format?: (_value: string) => string;
}

type ActiveOrder = { name: string; direction: SortOrder } | null;

const getColumns = (
  activeOrder?: ActiveOrder,
  handleOrderClick?: (_activeOrder: ActiveOrder) => void
): Column[] => {
  const getClickHandler = (name: string) => () => {
    if (activeOrder?.name === name && activeOrder.direction === SortOrder.Desc) {
      return handleOrderClick?.(null);
    }

    const direction = activeOrder?.name === name ? SortOrder.Desc : SortOrder.Asc;

    return handleOrderClick?.({ name, direction });
  };

  const getActiveProps = (name: string) => ({
    active: activeOrder?.name === name,
    direction: (activeOrder?.name === name
      ? activeOrder?.direction.toLocaleLowerCase()
      : "desc") as never
  });

  return [
    {
      id: "id",
      label: (
        <Box className='flex'>
          <Text>ID</Text>
          <TableSortLabel onClick={getClickHandler("id")} {...getActiveProps("id")} />
        </Box>
      )
    },
    {
      id: "name",
      label: (
        <Box className='flex'>
          <Text>Name</Text>
          <TableSortLabel onClick={getClickHandler("name")} {...getActiveProps("name")} />
        </Box>
      ),
      minWidth: 100
    },
    {
      id: "description",
      label: (
        <Box className='flex'>
          <Text>Description</Text>
          <TableSortLabel
            onClick={getClickHandler("description")}
            {...getActiveProps("description")}
          />
        </Box>
      ),
      minWidth: 170
    },
    {
      id: "content",
      label: (
        <Box className='flex'>
          <Text>Content</Text>
          <TableSortLabel onClick={getClickHandler("content")} {...getActiveProps("content")} />
        </Box>
      ),
      minWidth: 170
    },
    {
      id: "created_at",
      label: (
        <Box className='flex'>
          <Text>Created at</Text>
          <TableSortLabel
            onClick={getClickHandler("created_at")}
            {...getActiveProps("created_at")}
          />
        </Box>
      ),
      minWidth: 170,
      format: (value: string) => {
        const date = new Date(value);

        return `${date.getDate()}.${`${date.getMonth()}`.padStart(2, "0")}.${date.getFullYear()}`;
      }
    }
  ];
};

export const NewsTable: React.FC = () => {
  const [activeOrder, setActiveOrder] = useState<ActiveOrder>(null);
  const [pagination, setPagination] = useState<{ page: number; perPage: number }>({
    page: 0,
    perPage: 30
  });
  const { mutateAsync: fetchNews, data, isLoading } = useFetchNews();

  const news = data?.news;

  useEffect(() => {
    fetchNews({ page: pagination.page + 1, first: pagination.perPage });
  }, [pagination, fetchNews]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPagination((state) => ({ ...state, page: newPage }));
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPagination({ perPage: +event.target.value, page: 0 });
  };

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
                    {getColumns(activeOrder, setActiveOrder).map((column) => (
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
                      <TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
                        {getColumns(activeOrder, setActiveOrder).map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "string"
                                ? column.format(value)
                                : value}
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
