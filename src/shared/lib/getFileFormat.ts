export const getFileFormat = (fullName: string) => {
  return fullName.slice(fullName.lastIndexOf(".") + 1);
};
