import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import React, { Fragment } from "react";
import { getEventValueHandler } from "~/shared/lib/events";
import { useRequestState } from "~/shared/hooks/useRequestState";
import { Text } from "~/shared/components/Text";
import { SearchInput } from "~/shared/components/SearchInput";
import { Panel } from "~shared/components/Panel/Panel";
import { useCompilationsStore } from "~/shared/stores/compilations";
import { getColumns } from "./lib/getColumns";

export const CompilationsTable: React.FC = () => {
  const { title, handleTitleChange, resetTitle } = useRequestState("name");

  const compilations = useCompilationsStore((state) => state.compilations);

  const columns = getColumns();

  return (
    <Panel>
      <Box className='flex items-stretch gap-2 p-4 flex-col sm:flex-row'>
        <SearchInput
          disabled
          label={<Text>Fast search</Text>}
          fullWidth
          value={title}
          onChange={getEventValueHandler(handleTitleChange)}
          size='small'
          handleReset={resetTitle}
        />
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

            <TableBody>
              {compilations.map((row) => {
                return (
                  <TableRow hover role='row' tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.render?.(value, row) ??
                            column.format?.(value) ??
                            (value as string)}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Fragment>
    </Panel>
  );
};
