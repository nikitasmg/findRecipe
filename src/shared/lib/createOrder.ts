import { OrderByClause, SortOrder } from "~/generated/graphql";

export const createOrder = (order: { [key: string]: SortOrder }): OrderByClause[] => {
  return Object.entries(order).reduce((res: OrderByClause[], [key, value]) => {
    res.push({ column: key, order: value });
    return res;
  }, []);
};
