import { useCallback, useState } from "react";

export const useModal = (id = "modal") => {
  const [open, setOpen] = useState("");

  const handleOpen = useCallback((newId?: string) => setOpen(newId ?? id), [id]);

  const handleClose = useCallback(() => setOpen(""), []);

  const toggleModal = useCallback(
    (newId?: string) =>
      setOpen((is) => {
        const currentId = newId ?? id;

        return is ? "" : currentId;
      }),
    [id]
  );

  return {
    open,
    handleOpen,
    handleClose,
    toggleModal
  };
};
