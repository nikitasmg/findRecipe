export const getFilesFromNative = (): Promise<File[]> => {
  const input = document.createElement("input");
  input.type = "file";
  input.click();

  return new Promise((res) => {
    input.onchange = (e) => {
      if (e.target && "files" in e.target) {
        return res(e.target.files as File[]);
      }

      res([]);
    };

    window.onfocus = () => {
      setTimeout(() => {
        if (input.files?.length === 0) {
          return res([]);
        }
      }, 300);
    };
  });
};
