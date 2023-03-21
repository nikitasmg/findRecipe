export const getFileName = (fullName: string) => {
  return fullName.slice(0, fullName.lastIndexOf("."));
};
