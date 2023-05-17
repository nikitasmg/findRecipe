import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import dayjs, { Dayjs } from "dayjs";
import { formatDateForTable } from "~shared/lib/formatDate";
import { useTranslation } from "react-i18next";

const dateDirectory: Record<string, string> = {
  created_atLike: "Created at",
  dateLike: "Start date",
  deadlineLike: "Deadline",
  published_atLike: "Published at"
};

type FilterChipsProps = {
  filters: Record<string, unknown>;
  handleRemove: (key: string) => void;
  additionalData?: Record<string, Record<number, string>>;
  excludedKeys?: string[];
};

type ChipProps = {
  value: string;
  handleRemove: () => void;
};

const Chip: React.FC<ChipProps> = ({ value, handleRemove }) => {
  const handleRemoveIcon = (event: React.MouseEvent) => {
    event.stopPropagation();
    handleRemove();
  };

  return (
    <Box className='flex items-center justify-center gap-2 bg-primary-10 rounded p-2 m-2 mr-0 h-[32px]'>
      <Typography color='black' fontSize={14}>
        {value}
      </Typography>
      <IconButton className='w-[20px] h-[20px]' onClick={handleRemoveIcon}>
        <CloseIcon />
      </IconButton>
    </Box>
  );
};

export const FilterChips: React.FC<FilterChipsProps> = ({
  filters,
  additionalData,
  handleRemove,
  excludedKeys
}) => {
  const { t } = useTranslation();
  const chipsData: Record<string, string> = {};

  Object.keys(filters).map((key) => {
    if (!filters[key] || excludedKeys?.includes(key)) {
      return;
    } else if (key === "id") {
      chipsData[key] = `ID: ${filters[key]}`;
    } else if (additionalData?.[key]) {
      chipsData[key] = `${additionalData?.[key]?.[filters[key] as number]}`;
    } else if (dayjs.isDayjs(filters[key] as Dayjs)) {
      chipsData[key] = `${t(dateDirectory[key])}: ${formatDateForTable(filters[key]?.toString())}`;
    } else if (key === "on_index") {
      chipsData[key] = t("On the main");
    } else if (key === "published") {
      chipsData[key] = t("Published");
    } else {
      chipsData[key] = `${filters[key]}`;
    }
  });

  return (
    <>
      {Object.keys(chipsData).map((filterKey, index) => (
        <Chip
          key={index}
          value={chipsData[filterKey]}
          handleRemove={() => handleRemove(filterKey)}
        />
      ))}
    </>
  );
};
