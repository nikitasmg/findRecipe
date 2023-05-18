import { useCallback } from "react";
import { getActiveSortProps, getClickSortHandler } from "../lib/sortProps";
import { ActiveOrder } from "../types/ActiveOrder";

export const useSortProps = (
  handleOrderClick?: (order: ActiveOrder) => void,
  activeOrder?: ActiveOrder
) => {
  const getClickHandler = useCallback(
    (name: string) => getClickSortHandler(name, handleOrderClick, activeOrder),
    [handleOrderClick, activeOrder]
  );

  const getActiveProps = useCallback(
    (name: string) => getActiveSortProps(name, activeOrder),
    [activeOrder]
  );

  return {
    getClickHandler,
    getActiveProps
  };
};
