// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mapIdToValue = (idKey: string, valueKey: string, data?: any[], prefix = "") => {
  const result: Record<number, string> = {};

  data?.forEach((item) => {
    result[item[idKey]] = `${prefix}${item[valueKey]}`;
  });

  return result;
};
