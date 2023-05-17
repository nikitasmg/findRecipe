import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { getEventValueHandler } from "~/shared/lib/events";
import { useRequestState } from "~/shared/hooks/useRequestState";
import { useCompilationsStore } from "~/shared/stores/compilations";
import { getColumns } from "./lib/getColumns";
import { TableWrapper } from "~shared/components/TableWrapper";
import { TableActions } from "~shared/components/TableActions";
import { EmptyView } from "~shared/components/EmptyView";

export const CompilationsTable: React.FC = () => {
  const { title, setTitle, handleSearchTitle, resetFilters, resetTitle } = useRequestState("name");

  const { t } = useTranslation();

  const compilations = useCompilationsStore((state) => state.compilations);

  const filteredCompilations = compilations
    .map((compilation) => ({ ...compilation, heading: t(compilation.heading) }))
    .filter((compilation) => compilation.heading.toLowerCase().includes(title));

  const columns = getColumns();

  const handleTitle = (value: string) => {
    setTitle(value);
    handleSearchTitle(value);
  };

  return (
    <TableWrapper>
      <TableActions
        searchProps={{
          searchValue: title,
          searchChange: getEventValueHandler(handleTitle),
          resetTitle
        }}
        resetFilters={resetFilters}
        searchTitle='Search'
        searchOnly
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

          <TableBody>
            {filteredCompilations.map((row) => {
              return (
                <TableRow hover role='row' tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={column.style}
                        className={column.className}
                      >
                        {column.render?.(value, row) ?? (value as string)}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {!filteredCompilations?.length && <EmptyView />}
      </TableContainer>
    </TableWrapper>
  );
};
