export const getFileUrl = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    resolve(URL.createObjectURL(file));
  });
};
