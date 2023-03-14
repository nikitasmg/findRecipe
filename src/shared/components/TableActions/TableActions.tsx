import { Box } from "@mui/material";
import React, { ChangeEvent, MouseEvent, ReactNode } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import { useModal } from "~/shared/hooks/useModal";
import { SearchInput } from "../SearchInput";
import { Text } from "../Text";
import { Button } from "../Button";
import { ModalFilters } from "../ModalFilters";
import { LinkButton } from "../LinkButton";

type Props = {
  searchProps: {
    searchValue: string;
    searchChange: (e: ChangeEvent<HTMLInputElement>) => void;
    resetTitle: () => void;
  };
  addButtonProps?: {
    addHref?: string;
    onAddClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  };
  resetFilters?: () => void;
  searchTitle?: string;
  filterModalInnerForm?: ReactNode;
};

export const TableActions: React.FC<Props> = ({
  searchProps: { searchValue, searchChange, resetTitle },
  resetFilters,
  addButtonProps,
  filterModalInnerForm,
  searchTitle = "Fast search"
}) => {
  const { open, handleOpen, handleClose } = useModal();

  const handleOpenFilters = () => handleOpen();

  return (
    <Box className='flex items-stretch justify-between gap-2 flex-col sm:flex-row'>
      <Box className='flex items-stretch justify-between gap-2 sm:w-[400px]'>
        <SearchInput
          label={<Text>{searchTitle}</Text>}
          className='w-full'
          value={searchValue}
          onChange={searchChange}
          size='small'
          handleReset={resetTitle}
        />

        {filterModalInnerForm && (
          <>
            <Button onClick={handleOpenFilters} variant='outlined'>
              <FilterAltIcon />
            </Button>

            <ModalFilters opened={!!open} handleClose={handleClose} handleDrop={resetFilters}>
              {filterModalInnerForm}
            </ModalFilters>
          </>
        )}
      </Box>

      {addButtonProps && (
        <LinkButton
          variant='outlined'
          onClick={addButtonProps?.onAddClick}
          href={addButtonProps?.addHref}
          startIcon={<AddBoxRoundedIcon />}
        >
          Add
        </LinkButton>
      )}
    </Box>
  );
};
