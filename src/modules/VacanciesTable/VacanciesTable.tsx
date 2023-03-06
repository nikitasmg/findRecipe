import {
  Box,
  CircularProgress,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import { DeepPartial } from "react-hook-form";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import React, { Fragment } from "react";
import { Vacancy } from "~/generated/graphql";
import { getEventValueHandler } from "~/shared/lib/events";
import { VacanciesPageCreate } from "~/shared/routes";
import { LinkButton } from "~/shared/components/LinkButton";
import { Text } from "~/shared/components/Text";
import { SearchInput } from "~/shared/components/SearchInput";
import { Panel } from "~shared/components/Panel";
import { Button } from "~/shared/components/Button";
import { useColumns } from "./lib/useColumns";
import { ModalFilters } from "~/shared/components/ModalFilters";
import { useModal } from "~/shared/hooks/useModal";
import { FiltersForm } from "./components/FiltersForm";
import { CellDragHandle } from "~shared/components/CellDragHandle";
import { TableBodySortable, TableRowSortable } from "~shared/components/SortableTable";
import { useVacancies } from "~/modules/VacanciesTable/lib/useVacancies";

export const VacanciesTable: React.FC = () => {
  const {
    title,
    params,
    activeOrder,
    handleTitleChange,
    handleChangeOrder,
    handleFilterChange,
    resetFilters,
    isLoading,
    rows,
    onSortEnd
  } = useVacancies();

  const { open, handleOpen, handleClose } = useModal();

  const columns = useColumns(activeOrder, handleChangeOrder);

  const handleOpenFilters = () => handleOpen();

  return (
    <Panel>
      <Box className='flex items-stretch justify-between gap-2 p-4 flex-col sm:flex-row'>
        <Box className='flex items-stretch justify-between gap-2'>
          <SearchInput
            label={<Text>Fast search</Text>}
            className='w-full sm:w-auto'
            value={title}
            InputLabelProps={{
              shrink: !!title
            }}
            onChange={getEventValueHandler(handleTitleChange)}
            size='small'
          />
          <Button onClick={handleOpenFilters} variant='outlined'>
            <FilterAltIcon />
          </Button>

          <ModalFilters
            opened={!!open}
            handleClose={handleClose}
            handleSuccess={handleClose}
            handleDrop={resetFilters}
          >
            <FiltersForm params={params} handleChangeFilter={handleFilterChange} />
          </ModalFilters>
        </Box>

        <LinkButton variant='outlined' href={VacanciesPageCreate} startIcon={<AddBoxRoundedIcon />}>
          Add
        </LinkButton>
      </Box>

      <Fragment>
        <TableContainer>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                <CellDragHandle />

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
              <TableBodySortable onSortEnd={onSortEnd} useDragHandle>
                {rows?.map((row: DeepPartial<Vacancy>, index) => {
                  return (
                    <TableRowSortable key={row.id} index={index}>
                      <CellDragHandle />

                      {columns.map((column) => {
                        const value = row[column.id];

                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.render?.(value, row) ?? value}
                          </TableCell>
                        );
                      })}
                    </TableRowSortable>
                  );
                })}
              </TableBodySortable>
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
