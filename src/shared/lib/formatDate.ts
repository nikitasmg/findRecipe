import dayjs from "dayjs";
import { compose } from "rambda";
import { dateToISOString } from "./dateToISOString";

export const formatDateForTable = (value: unknown) => {
  if (typeof value !== "string") {
    return "-";
  }

  return dayjs(value).format("DD.MM.YYYY");
};

export const formatDateForFilters = (value: unknown) => {
  if (typeof value !== "string") {
    return "";
  }
  return dayjs(value).format("YYYY-MM-DD");
};

export const formatDayJsForFilters = compose(formatDateForFilters, dateToISOString);
