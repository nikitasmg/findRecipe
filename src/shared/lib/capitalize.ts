export const capitalize = (str: string) =>
  str.at(0)?.toUpperCase().concat(str.slice(1).toLowerCase()) ?? str;
