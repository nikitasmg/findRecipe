export const mapIdToValue = (idKey: string, valueKey: string, data?: any[], prefix = "") => {
  const result: Record<number, string> = {};

  data?.forEach((item) => {
    result[item[idKey]] = `${prefix}${item[valueKey]}`;
  });

  return result;
};
