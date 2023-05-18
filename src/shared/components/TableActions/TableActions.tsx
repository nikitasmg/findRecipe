import { Box } from "@mui/material";
import React, { ChangeEvent, MouseEvent, ReactNode } from "react";
import { useModal } from "~/shared/hooks/useModal";
import { SearchInput } from "../SearchInput";
import { ModalFilters } from "../ModalFilters";
import { FiltersControl, Props as FiltersControlProps } from "../FiltersControl";
import { AddButton } from "~shared/components/AddButton";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { FilterChips } from "~shared/components/FilterChips";

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
  filters?: Record<string, string> | null;
  removeFilter?: (key: string) => void;
  additionalFilterChipsData?: Record<string, Record<number, string>>;
  excludedChipsKeys?: string[];
  handleSubmit?: () => void;
  searchOnly?: boolean;
  searchTitle?: string;
  filterModalInnerForm?: ReactNode;
  filterControl?: FiltersControlProps;
  contentButtons?: JSX.Element;
};

export const TableActions: React.FC<Props> = ({
  searchProps: { searchValue, searchChange, resetTitle },
  resetFilters,
  filters,
  removeFilter,
  additionalFilterChipsData,
  excludedChipsKeys,
  handleSubmit,
  searchOnly,
  addButtonProps,
  filterModalInnerForm,
  searchTitle = "Filter + search",
  filterControl,
  contentButtons
}) => {
  const { t } = useTranslation();
  const { open, handleOpen, handleClose } = useModal();

  const showFilterChips = !open && filters && removeFilter && filterModalInnerForm;

  const searchInputWrapperClassName = clsx(
    "flex items-center flex-wrap w-full bg-mainBg px-1 min-h-[48px]",
    "border rounded-lg hover:border-primary-30 cursor-pointer",
    {
      "!block border-primary-30": !!open
    }
  );

  const handleOpenFilters = () => handleOpen();

  return (
    <Box className='flex flex-col mb-[24px]'>
      <Box className='flex items-stretch gap-4 flex-col sm:flex-row'>
        <Box className='w-full'>
          <Box className={searchInputWrapperClassName} onClick={handleOpenFilters}>
            <SearchInput
              placeholder={t(searchTitle) ?? ""}
              value={searchValue}
              opened={!!open}
              searchOnly={searchOnly}
              onChange={searchChange}
              handleClose={handleClose}
              handleReset={resetTitle}
            />
            {showFilterChips && (
              <FilterChips
                filters={filters}
                handleRemove={removeFilter}
                additionalData={additionalFilterChipsData}
                excludedKeys={excludedChipsKeys}
              />
            )}
          </Box>

          {filterModalInnerForm && (
            <ModalFilters
              opened={!!open}
              handleClose={handleClose}
              handleDrop={resetFilters}
              handleSubmit={handleSubmit}
            >
              {filterModalInnerForm}
            </ModalFilters>
          )}
        </Box>
        <Box className='flex gap-4 flex-col sm:flex-row'>
          {addButtonProps && (
            <AddButton onClick={addButtonProps?.onAddClick} href={addButtonProps?.addHref} />
          )}
          {contentButtons}
        </Box>
      </Box>
      <FiltersControl {...filterControl} />
    </Box>
  );
};
