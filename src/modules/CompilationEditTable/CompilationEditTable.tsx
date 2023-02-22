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
import React from "react";
import { compose, equals, prop } from "rambda";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { Panel } from "~/shared/components/Panel";
import { useRequestState } from "~/shared/hooks/useRequestState";
import { useCompilationsStore } from "~/shared/stores/compilations";
import { CompilationItem } from "~/shared/types/Compilation";
import { getColumns } from "./lib/getColumns";
import { DetailsHead } from "~/shared/components/DetailsHead";
import { useNavigate } from "react-router-dom";
import { Text } from "~/shared/components/Text";

type Props = {
  id: number;
};

export const CompilationEditTable: React.FC<Props> = ({ id }) => {
  const compilationsHooks = useCompilationsStore((state) => state.compilationsHooks);

  const { fetchHook, key } = compilationsHooks[id];

  const client = useGraphqlClient();

  const { variables } = useRequestState("name");

  const { data, isLoading } = fetchHook(client, variables);

  const rows = data?.[key as keyof typeof data] as CompilationItem[];

  const compilations = useCompilationsStore((state) => state.compilations);

  const compilationMeta = compilations.find(compose(equals(id), prop("id")));

  const columns = getColumns();

  const history = useNavigate();

  const handleBackClick = () => history(-1);

  return (
    <Panel>
      <Box>
        <DetailsHead title='Compilations editing' onBackClick={handleBackClick} />
      </Box>

      <Box component='section' className='flex items-center justify-center gap-1 w-full py-4'>
        <Text variant='h6'>{compilationMeta?.heading ?? ""}</Text> ({compilationMeta?.title ?? ""})
      </Box>
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
              {rows?.map((row) => {
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
    </Panel>
  );
};
