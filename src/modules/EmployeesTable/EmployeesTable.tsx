import React, { Fragment, useEffect } from "react";
import { Panel } from "~shared/components/Panel";
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
import { LinkButton } from "~shared/components/LinkButton";
import { EmployeesPageCreate } from "~shared/routes";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import { Employee, useEmployeesQuery } from "~/generated/graphql";
import { useRequestState } from "~shared/hooks/useRequestState";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { useEmployeesStore } from "~stores/employees";
import { useColumns } from "~/modules/EmployeesTable/lib/useColumns";

const EmployeesTable = () => {
  const { variables, activeOrder, handleChangeOrder } = useRequestState("name");

  const client = useGraphqlClient();

  const { setCount, setLoading } = useEmployeesStore((state) => ({
    setLoading: state.setLoading,
    setCount: state.setCount
  }));

  const { data, isLoading } = useEmployeesQuery(client, variables, { refetchOnMount: "always" });

  const employees = data?.employees;

  const total = employees?.length ?? 0;

  const columns = useColumns(activeOrder, handleChangeOrder);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  useEffect(() => {
    setCount(total);
  }, [total, setCount]);

  return (
    <Panel>
      <Box className='flex items-stretch justify-between gap-2 p-4 flex-col sm:flex-row'>
        <LinkButton variant='outlined' href={EmployeesPageCreate} startIcon={<AddBoxRoundedIcon />}>
          Add
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
                {employees?.map((row: Employee) => {
                  return (
                    <TableRow hover role='row' tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align ?? "left"}>
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
      </Fragment>
    </Panel>
  );
};

export default EmployeesTable;
