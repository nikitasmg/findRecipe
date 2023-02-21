export const formatDate = (value: unknown) => {
  if (typeof value !== "string") {
    return "-";
  }

  const date = new Date(value);

  return `${date.getDate()}.${`${date.getMonth()}`.padStart(2, "0")}.${date.getFullYear()}`;
};
