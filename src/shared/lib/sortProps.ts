import { SortOrder } from "~/generated/graphql";
import { ActiveOrder } from "~/shared/types/ActiveOrder";

export const getClickSortHandler =
  (name: string, handleChangeOrder?: (order: ActiveOrder) => void, activeOrder?: ActiveOrder) =>
  () => {
    if (activeOrder?.[name] && activeOrder[name] === SortOrder.Desc) {
      return handleChangeOrder?.(null);
    }

    const direction = activeOrder?.[name] === SortOrder.Asc ? SortOrder.Desc : SortOrder.Asc;

    return handleChangeOrder?.({ [name]: direction });
  };

export const getActiveSortProps = (name: string, activeOrder?: ActiveOrder) => ({
  active: !!activeOrder?.[name],
  direction: (activeOrder?.[name]
    ? activeOrder[name].toLocaleLowerCase()
    : "desc") as Lowercase<SortOrder>
});
