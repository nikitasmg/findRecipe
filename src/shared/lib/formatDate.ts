import dayjs from "dayjs";

export const formatDate = (value: unknown) => {
  if (typeof value !== "string") {
    return "-";
  }

  return dayjs(value).format("DD.MM.YYYY");
};
