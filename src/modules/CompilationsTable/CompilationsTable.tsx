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
import React from "react";
import { useTranslation } from "react-i18next";
import { getEventValueHandler } from "~/shared/lib/events";
import { useRequestState } from "~/shared/hooks/useRequestState";
import { Text } from "~/shared/components/Text";
import { SearchInput } from "~/shared/components/SearchInput";
import { Panel } from "~shared/components/Panel/Panel";
import { useCompilationsStore } from "~/shared/stores/compilations";
import { getColumns } from "./lib/getColumns";

export const CompilationsTable: React.FC = () => {
  const { title, handleTitleChange, resetTitle } = useRequestState("name");

  const { t } = useTranslation();

  const compilations = useCompilationsStore((state) => state.compilations);

  const filteredCompilations = compilations
    .map((compilation) => ({ ...compilation, heading: t(compilation.heading) }))
    .filter((compilation) => compilation.heading.toLowerCase().includes(title));

  const columns = getColumns();

  return (
    <Panel>
      <Box className='flex flex-col gap-6 p-4'>
        <SearchInput
          label={<Text>Fast search</Text>}
          className='max-w-[330px]'
          fullWidth
          value={title}
          onChange={getEventValueHandler(handleTitleChange)}
          size='small'
          handleReset={resetTitle}
        />

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
              {filteredCompilations.map((row) => {
                return (
                  <TableRow hover role='row' tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.render?.(value, row) ?? (value as string)}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Panel>
  );
};
