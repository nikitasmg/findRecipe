import dayjs from "dayjs";

export const dateToISOString = (date?: Date) => {
  if (!dayjs(date).isValid()) {
    return undefined;
  }

  return date?.toISOString();
};
